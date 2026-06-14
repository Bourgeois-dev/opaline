import { useEffect, useState } from "react";
import { supabase, fetchActive, fetchContent } from "../lib/supabase";
import type { MenuItem, GalleryImage, Partner, Review, SocialLink, OpeningHour } from "../lib/types";
import Navbar from "../components/site/Navbar";
import Hero from "../components/site/Hero";
import Histoire from "../components/site/Histoire";
import Carte from "../components/site/Carte";
import Ardoise from "../components/site/Ardoise";
import Partenaires from "../components/site/Partenaires";
import Galerie from "../components/site/Galerie";
import Avis from "../components/site/Avis";
import Newsletter from "../components/site/Newsletter";
import Footer from "../components/site/Footer";
import HorairesModal from "../components/site/HorairesModal";
import ReservationWidget from "../components/site/ReservationWidget";

export default function Site() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [story, setStory] = useState<any>(null);
  const [ardoise, setArdoise] = useState<any>(null);
  const [flags, setFlags] = useState<{ partners: boolean; reviews: boolean }>({ partners: true, reviews: true });
  const [horairesOpen, setHorairesOpen] = useState(false);
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [m, g, p, r, s, h, st, ard, pf, rf] = await Promise.all([
        fetchActive<MenuItem>("menu_items"),
        fetchActive<GalleryImage>("gallery_images"),
        fetchActive<Partner>("partners"),
        fetchActive<Review>("reviews"),
        fetchActive<SocialLink>("social_links"),
        fetchActive<OpeningHour>("opening_hours", "day_of_week"),
        fetchContent("story"),
        fetchContent("ardoise"),
        fetchContent("partners_enabled"),
        fetchContent("reviews_enabled"),
      ]);
      setMenu(m.filter((x) => x.is_active));
      setGallery(g.filter((x) => x.is_active));
      setPartners(p.filter((x) => x.is_active));
      setReviews(r.filter((x) => x.is_active));
      setSocials(s.filter((x) => x.is_active));
      setHours(h);
      setStory(st);
      setArdoise(ard);
      setFlags({ partners: pf?.enabled ?? true, reviews: rf?.enabled ?? true });
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="loading">Chargement…</div>;

  return (
    <>
      <Navbar onReserve={() => setWidgetOpen(true)} />
      <Hero onReserve={() => setWidgetOpen(true)} onHours={() => setHorairesOpen(true)} />
      <Histoire story={story} />
      <Carte menu={menu} />
      {ardoise?.enabled !== false && <Ardoise ardoise={ardoise} />}
      {flags.partners && partners.length > 0 && <Partenaires partners={partners} />}
      {gallery.length > 0 && <Galerie images={gallery} />}
      {flags.reviews && reviews.length > 0 && <Avis reviews={reviews} />}
      <Newsletter socials={socials} />
      <Footer hours={hours} socials={socials} />
      <HorairesModal hours={hours} open={horairesOpen} onClose={() => setHorairesOpen(false)} />
      <ReservationWidget hours={hours} open={widgetOpen} onClose={() => setWidgetOpen(false)} />
    </>
  );
}

// Note : le FAB "Réserver" est rendu directement dans Site.tsx au niveau du return
// Il est intégré dans le composant ci-dessus via le bouton Navbar
