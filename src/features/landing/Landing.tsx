import LinkCard from "./components/LinkCard"
import styles from "./Landing.module.css"
import { useEffect, useRef } from "react";

export default function Landing() {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {

        if (audioRef.current) {
            audioRef.current.volume = 0.03;
        }

    }, []);

    return (

        <section className={styles.landing__section}>

            <video
                className={styles.landing__background__video}
                src="/background-video.mp4"
                autoPlay
                loop
                muted
                playsInline
            />

            <audio ref={audioRef} src="/YSL.mp3" autoPlay loop hidden />

            <div className={styles.landing__barber__profile}>

                <div className={styles.landing__profile__image__container}>
                    <img 
                        src="/profile-example.jpeg" 
                        alt="Profile" 
                        className={styles.landing__profile__image}
                    />
                </div>

                <h1 className={styles.landing__profile__name}>franii barber</h1>

            </div>

            <LinkCard 
                href="/reservas" 
                title="¡Reserva tu turno online!" 
                icon="/calendar-icon.svg"
                variant="default"
            />
            
            <LinkCard 
                href="/cortes" 
                title="Mis cortes" 
                icon="/gallery-icon.png"
                variant="second__default"
            />
            
            <LinkCard 
                href="https://www.instagram.com/13franii/" 
                title="Instagram" 
                icon="/instagram-icon.svg"
                variant="instagram"
            />

            <LinkCard 
                href="https://wa.me/5491164924418?text=Hola!%20Quiero%20reservar%20un%20turno." 
                title="Whatsapp" 
                icon="/whatsapp-icon.svg"
                variant="whatsapp"
            />

            <LinkCard 
                href="https://www.google.com.ar/maps/place/Av.+del+Libertador+1752,+B1743+Moreno,+Provincia+de+Buenos+Aires/@-34.6322566,-58.7826379,21z/data=!4m6!3m5!1s0x95bc95ca94c329d5:0x78901e78ebe1ed19!8m2!3d-34.6306687!4d-58.7814965!16s%2Fg%2F11y498ff3x?hl=es&entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D" 
                title="Mi ubicación" 
                icon="/google-maps-icon.svg"
                variant="location"
            />
            
        </section>
    );
}