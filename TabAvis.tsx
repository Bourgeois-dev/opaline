import { useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import TabTableau from "./TabTableau";
import TabReservations from "./TabReservations";
import TabCarte from "./TabCarte";
import TabArdoise from "./TabArdoise";
import TabPromo from "./TabPromo";
import TabPlan from "./TabPlan";
import TabHoraires from "./TabHoraires";
import TabGalerie from "./TabGalerie";
import TabPartenaires from "./TabPartenaires";
import TabContacts from "./TabContacts";
import TabSocial from "./TabSocial";
import TabAvis from "./TabAvis";
import TabParametres from "./TabParametres";

const TABS: { key: string; label: string; comp: React.FC }[] = [
  { key: "tableau", label: "Tableau de bord", comp: TabTableau },
  { key: "reservations", label: "Réservations", comp: TabReservations },
  { key: "carte", label: "La carte", comp: TabCarte },
  { key: "ardoise", label: "Ardoise du jour", comp: TabArdoise },
  { key: "promo", label: "Bannière promo", comp: TabPromo },
  { key: "plan", label: "Plan de salle", comp: TabPlan },
  { key: "horaires", label: "Horaires", comp: TabHoraires },
  { key: "galerie", label: "Galerie", comp: TabGalerie },
  { key: "partenaires", label: "Partenaires", comp: TabPartenaires },
  { key: "contacts", label: "Contacts", comp: TabContacts },
  { key: "social", label: "Réseaux sociaux", comp: TabSocial },
  { key: "avis", label: "Avis clients", comp: TabAvis },
  { key: "parametres", label: "Réservations & site", comp: TabParametres },
];

export default function AdminApp({ session }: { session: Session }) {
  const [active, setActive] = useState("tableau");
  const Current = TABS.find((t) => t.key === active)?.comp || TabTableau;
  const siteUrl = import.meta.env.VITE_SITE_URL || "/";

  return (
    <div className="app">
      <aside className="side">
        <div className="logo">{import.meta.env.VITE_RESTO_NAME || "Restaurant"}<small>Administration</small></div>
        <nav>
          {TABS.map((t) => (
            <button key={t.key} className={active === t.key ? "actif" : ""} onClick={() => setActive(t.key)}>{t.label}</button>
          ))}
        </nav>
        <a className="voir-site" href={siteUrl} target="_blank" rel="noopener">↗ Voir le site</a>
        <div className="compte">
          <b>{session.user.email}</b>
          <button className="deco" onClick={() => supabase.auth.signOut()}>Se déconnecter</button>
        </div>
      </aside>
      <main className="main">
        <Current />
      </main>
    </div>
  );
}
