import { Legacy as LegacyImages } from '../utils/cloudinaryUrls';
import '../styles/Legacy.css'

const LegacyBg = LegacyImages.Television;
const LegacyBgMobile = LegacyImages.LegacyBgMobile;
const LegacyText = LegacyImages.LegacyText;

const Legacy = () => {
    return (
        <div className="px-1 w-full h-screen flex justify-center text-center items-center bg-[#FDDEC0] overflow-hidden">
            <div className="legacy-stamp-border w-full max-w-[100vw] h-[calc(100vh-2rem)] max-h-[100vh] box-border">
                <div className="inner-white-border">
                    <div className="legacy-content">
                        <img src={LegacyBg} alt="Legacy Background" className="legacy-bg-image desktop-only" />
                        <img src={LegacyBgMobile} alt="Legacy Mobile Background" className="legacy-bg-image mobile-only" />
                        <img src={LegacyText} alt="The Legacy" className="legacy-text-overlay" />

                        <iframe
                            className="legacy-gif-purple"
                            src="https://www.youtube.com/embed/1xyrpnRfusg?autoplay=1&mute=1&loop=1&playlist=1xyrpnRfusg&controls=0&modestbranding=1&rel=0&showinfo=0"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            frameBorder="0"
                            allowFullScreen></iframe>
                        <iframe
                            className="legacy-gif-blue"
                            src="https://www.youtube.com/embed/QZO4VgaFf2I?autoplay=1&mute=1&loop=1&playlist=QZO4VgaFf2I&controls=0&modestbranding=1&rel=0&showinfo=0"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            frameBorder="0"
                            allowFullScreen></iframe>
                        <iframe
                            className="legacy-gif-green"
                            src="https://www.youtube.com/embed/MNJ8tqQgmnw?autoplay=1&mute=1&loop=1&playlist=MNJ8tqQgmnw&controls=0&modestbranding=1&rel=0&showinfo=0"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            frameBorder="0"
                            allowFullScreen></iframe>
                        <iframe
                            className="legacy-gif-yellow"
                            src="https://www.youtube.com/embed/LsxqAiT-t0A?autoplay=1&mute=1&loop=1&playlist=LsxqAiT-t0A&controls=0&modestbranding=1&rel=0&showinfo=0"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            frameBorder="0"
                            allowFullScreen></iframe>
                        <iframe
                            className="legacy-gif-red"
                            src="https://www.youtube.com/embed/E64TKUqgi_4?autoplay=1&mute=1&loop=1&playlist=E64TKUqgi_4&controls=0&modestbranding=1&rel=0&showinfo=0"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            frameBorder="0"
                            allowFullScreen></iframe>

                    </div>
                </div>
            </div>
        </div>

    );
};
export default Legacy;