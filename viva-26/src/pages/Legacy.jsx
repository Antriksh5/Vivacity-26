import LegacyBg from "../assets/Legacy/Television.png"
import LegacyBgMobile from "../assets/Legacy/LegacyBgMobile.png"
import LegacyText from "../assets/Legacy/LegacyText.png"
import '../styles/Legacy.css'


const Legacy = () => {
    return (
        <div className="py-10 px-4 w-full min-h-screen flex justify-center text-center items-center bg-[#FDDEC0]">
            <div className="legacy-stamp-border w-full max-w-[90%] box-border">
                <div className="inner-white-border">
                    <div className="legacy-content">
                        <img src={LegacyBg} alt="Legacy Background" className="legacy-bg-image desktop-only" />
                        <img src={LegacyBgMobile} alt="Legacy Mobile Background" className="legacy-bg-image mobile-only" />
                        <img src={LegacyText} alt="The Legacy" className="legacy-text-overlay" />

                        <iframe
                            className="legacy-gif-purple"
                            src="https://www.youtube.com/embed/1xyrpnRfusg?si=lD-JvTaS8tF1GP4N"
                            title="YouTube video player"
                            allow="accelerometer;autoplay;clipboard-write;encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen></iframe>
                        <iframe
                            className="legacy-gif-blue"
                            src="https://www.youtube.com/embed/QZO4VgaFf2I?si=FSgcXG-L5YcIZoib"
                            title="YouTube video player"
                            allow="accelerometer;autoplay;clipboard-write;encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen></iframe>
                        <iframe
                            className="legacy-gif-green"
                            src="https://www.youtube.com/embed/MNJ8tqQgmnw?si=tLMxFmdjew8zUFs0"
                            title="YouTube video player"
                            allow="accelerometer;autoplay;clipboard-write;encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen></iframe>
                        <iframe
                            className="legacy-gif-yellow"
                            src="https://www.youtube.com/embed/LsxqAiT-t0A?si=SrqGO4P7RNz6IVrE"
                            title="YouTube video player"
                            allow="accelerometer;autoplay;clipboard-write;encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen></iframe>
                        <iframe
                            className="legacy-gif-red"
                            src="https://www.youtube.com/embed/E64TKUqgi_4?si=yrcQeF-z2sDpGz6d"
                            title="YouTube video player"
                            allow="accelerometer;autoplay;clipboard-write;encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen></iframe>

                    </div>
                </div>
            </div>
        </div>
    );
};
export default Legacy;