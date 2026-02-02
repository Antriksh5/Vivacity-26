'use client';

import { useState, useEffect, FormEvent } from 'react';

interface Event {
  id: string;
  name: string;
  description: string;
  time: string;
  venue: string;
  notification_enabled: boolean;
  created_at: string;
}

/** Admin Panel for managing events and their notification status */
export default function AdminPanel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');

  /** Fetch all events from the API */
  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      if (!res.ok) throw new Error('Failed to fetch events');
      const data: Event[] = await res.json();
      setEvents(data);
    } catch (err) {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /** Clear form fields */
  const resetForm = () => {
    setName('');
    setDescription('');
    setTime('');
    setVenue('');
    setEditingId(null);
  };

  /** Show a temporary success message */
  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  /** Handle form submission for create/update */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = { name, description, time, venue };

    try {
      if (editingId) {
        const res = await fetch(`/api/events/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to update event');
        showSuccess('Event updated successfully!');
      } else {
        const res = await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to create event');
        showSuccess('Event created successfully!');
      }
      resetForm();
      await fetchEvents();
    } catch (err) {
      setError(editingId ? 'Failed to update event' : 'Failed to create event');
    } finally {
      setSubmitting(false);
    }
  };

  /** Toggle notification for an event */
  const toggleNotification = async (eventId: string, currentState: boolean) => {
    try {
      const res = await fetch(`/api/events/${eventId}/notification`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notification_enabled: !currentState }),
      });
      if (!res.ok) throw new Error('Failed to toggle notification');
      await fetchEvents();
      showSuccess(`Notification ${!currentState ? 'enabled' : 'disabled'}!`);
    } catch (err) {
      setError('Failed to toggle notification');
    }
  };

  /** Delete an event */
  const deleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`/api/events/${eventId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete event');
      await fetchEvents();
      showSuccess('Event deleted!');
    } catch (err) {
      setError('Failed to delete event');
    }
  };

  /** Populate form for editing */
  const startEdit = (event: Event) => {
    setName(event.name);
    setDescription(event.description);
    setTime(event.time);
    setVenue(event.venue);
    setEditingId(event.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-yt-text-secondary">
            Manage events and control notifications displayed on the website.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-200 ml-4">
              &times;
            </button>
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-900/50 border border-green-700 rounded-lg text-green-200">
            {success}
          </div>
        )}

        {/* Event Form */}
        <div className="bg-yt-card rounded-xl p-6 mb-8 border border-yt-border">
          <h2 className="text-xl font-semibold text-white mb-4">
            {editingId ? 'Edit Event' : 'Create New Event'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="event-name" className="block text-sm font-medium text-yt-text-secondary mb-1">
                  Event Name *
                </label>
                <input
                  id="event-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter event name"
                  required
                  className="w-full px-4 py-2.5 bg-yt-bg border border-yt-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="event-venue" className="block text-sm font-medium text-yt-text-secondary mb-1">
                  Venue *
                </label>
                <input
                  id="event-venue"
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="Enter event venue"
                  required
                  className="w-full px-4 py-2.5 bg-yt-bg border border-yt-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="event-time" className="block text-sm font-medium text-yt-text-secondary mb-1">
                Date &amp; Time *
              </label>
              <input
                id="event-time"
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g., Feb 15, 2025 at 6:00 PM"
                required
                className="w-full px-4 py-2.5 bg-yt-bg border border-yt-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="event-description" className="block text-sm font-medium text-yt-text-secondary mb-1">
                Description *
              </label>
              <textarea
                id="event-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter event description"
                required
                rows={3}
                className="w-full px-4 py-2.5 bg-yt-bg border border-yt-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-60 text-white font-medium rounded-lg transition-colors"
              >
                {submitting
                  ? 'Saving...'
                  : editingId
                  ? 'Update Event'
                  : 'Create Event'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-yt-hover hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Events List */}
        <div className="bg-yt-card rounded-xl p-6 border border-yt-border">
          <h2 className="text-xl font-semibold text-white mb-4">
            Events ({events.length})
          </h2>

          {loading ? (
            <div className="text-center py-12 text-yt-text-secondary">
              <div className="inline-block w-8 h-8 border-2 border-yt-text-secondary border-t-white rounded-full animate-spin mb-3" />
              <p>Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12 text-yt-text-secondary">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg mb-1">No events yet</p>
              <p className="text-sm">Create your first event using the form above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-yt-bg border border-yt-border rounded-lg p-4 hover:border-gray-600 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {event.name}
                        </h3>
                        {event.notification_enabled && (
                          <span className="shrink-0 inline-flex items-center px-2 py-0.5 bg-green-900/50 border border-green-700 text-green-300 text-xs font-medium rounded-full">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            LIVE
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-yt-text-secondary mb-2 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-yt-text-secondary">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.venue}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Notification Toggle */}
                      <button
                        onClick={() => toggleNotification(event.id, event.notification_enabled)}
                        className={`relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                          event.notification_enabled
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-yt-hover hover:bg-gray-600 text-yt-text-secondary'
                        }`}
                        title={event.notification_enabled ? 'Disable notification' : 'Enable notification'}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        {event.notification_enabled ? 'ON' : 'OFF'}
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => startEdit(event)}
                        className="p-2 hover:bg-yt-hover rounded-lg text-yt-text-secondary hover:text-white transition-colors"
                        title="Edit event"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="p-2 hover:bg-red-900/50 rounded-lg text-yt-text-secondary hover:text-red-400 transition-colors"
                        title="Delete event"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
