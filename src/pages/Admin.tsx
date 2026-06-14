import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Session } from "@supabase/supabase-js";
import AdminApp from "../components/admin/AdminApp";
import "./admin.css";

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    if (error) setErr("Identifiants incorrects.");
  }
  async function reset(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.href });
    setMsg(error ? "Erreur lors de l'envoi." : "Si ce compte existe, un e-mail de réinitialisation a été envoyé.");
  }

  if (!ready) return <div className="loading">Chargement…</div>;

  if (!session) {
    return (
      <div className="login-wrap">
        <div className="login-card">
          <div className="login-head">
            <div className="marque">{import.meta.env.VITE_RESTO_NAME || "Administration"}</div>
            <div className="role">Administration</div>
          </div>
          <div className="login-body">
            {!resetMode ? (
              <form onSubmit={login}>
                <h1>Connexion</h1>
                <p className="intro">Accédez à la gestion de votre site.</p>
                <div className="champ"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                <div className="champ"><label>Mot de passe</label><input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} required /></div>
                {err && <div className="login-err">{err}</div>}
                <button className="btn btn-accent" type="submit" style={{ width: "100%" }}>Se connecter</button>
                <button type="button" className="lien-reset" onClick={() => { setResetMode(true); setMsg(""); }}>Mot de passe oublié ?</button>
              </form>
            ) : (
              <form onSubmit={reset}>
                <h1>Réinitialiser</h1>
                <p className="intro">Saisissez votre email pour recevoir un lien.</p>
                <div className="champ"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                {msg && <div className="login-msg">{msg}</div>}
                <button className="btn btn-accent" type="submit" style={{ width: "100%" }}>Envoyer le lien</button>
                <button type="button" className="lien-reset" onClick={() => setResetMode(false)}>Retour à la connexion</button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <AdminApp session={session} />;
}
