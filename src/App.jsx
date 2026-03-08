import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Trophy, Clock, Mail, ChevronRight, Star } from "lucide-react";
import { supabase } from "./supabase";

export default function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skill, setSkill] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [referrals, setReferrals] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const referralStatus = useMemo(() => {
    if (referrals >= 10) return "Priority matchmaking unlocked";
    if (referrals >= 5) return "Founder badge unlocked";
    if (referrals >= 3) return "Beta access unlocked";
    if (referrals >= 1) return "Moved up the waitlist";
    return "Invite your squad to move up faster";
  }, [referrals]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.from("waitlist").insert([
      {
        name: name,
        email: email,
        skill_level: skill
      }
    ]);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSubmitted(true);
    setName("");
    setEmail("");
    setSkill("");
  };

  const features = [
    {
      icon: <Users size={24} />,
      title: "Balanced Player Matching",
      description:
        "Find players near you based on skill, availability, and match type so games feel competitive and fun.",
    },
    {
      icon: <MapPin size={24} />,
      title: "Local Court Discovery",
      description:
        "See where games are happening across Somerset County and spend less time searching through texts and groups.",
    },
    {
      icon: <Clock size={24} />,
      title: "Quick Game Creation",
      description:
        "Create or join games in seconds.",
    },
    {
      icon: <Trophy size={24} />,
      title: "Skill Confidence",
      description:
        "Ratings and post-game feedback keep matches competitive.",
    },
  ];

  return (
    <div style={styles.page}>

      <section style={styles.heroSection}>

        <div style={styles.heroGrid}>

          <div>

            <div style={styles.badge}>
              Launching first in Somerset County, NJ
            </div>

            <h1 style={styles.heroTitle}>
              Find your next pickleball game in seconds.
            </h1>

            <p style={styles.heroText}>
              MatchPoint helps pickleball players across Somerset County quickly find balanced games and spend less time searching.
            </p>

            <div style={styles.buttonRow}>
              <button style={styles.primaryButton}>
                Join the early access waitlist <ChevronRight size={18}/>
              </button>

              <button style={styles.secondaryButton}>
                See how it works
              </button>
            </div>

            <div style={styles.smallNote}>
              <Star size={14}/>
              Built for local players who want better games.
            </div>

          </div>

          <div style={styles.card}>
            <div style={styles.cardInner}>

              <h2>Get early access</h2>
              <p>Be one of the first Somerset County players on MatchPoint.</p>

              {!submitted ? (

                <form onSubmit={handleSubmit}>

                  <div style={styles.fieldGroup}>
                    <label>Name</label>
                    <input
                      style={styles.input}
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      required
                    />
                  </div>

                  <div style={styles.fieldGroup}>
                    <label>Email</label>
                    <input
                      type="email"
                      style={styles.input}
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div style={styles.fieldGroup}>
                    <label>Skill level</label>
                    <select
                      style={styles.input}
                      value={skill}
                      onChange={(e)=>setSkill(e.target.value)}
                      required
                    >
                      <option value="">Choose your level</option>
                      <option value="2.5-3.0">Beginner</option>
                      <option value="3.0-3.5">Intermediate</option>
                      <option value="3.5-4.0">Advanced</option>
                      <option value="4.0+">High-level</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    style={{...styles.primaryButton, width:"100%"}}
                    disabled={loading}
                  >
                    {loading ? "Joining..." : "Join the waitlist"}
                  </button>

                  {error && (
                    <p style={{color:"red",marginTop:10}}>
                      {error}
                    </p>
                  )}

                </form>

              ) : (

                <div style={styles.successBox}>
                  <h3>You're on the waitlist.</h3>
                  <p>
                    Thanks! We'll notify you when MatchPoint launches.
                  </p>
                </div>

              )}

            </div>
          </div>

        </div>

      </section>

      <section style={styles.featuresSection}>

        {features.map((feature)=>(
          <div key={feature.title} style={styles.featureCard}>
            {feature.icon}
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}

      </section>

    </div>
  );
}

const styles = {

page:{
fontFamily:"sans-serif",
padding:40
},

heroSection:{
marginBottom:60
},

heroGrid:{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:40
},

badge:{
background:"#d1fae5",
padding:"6px 12px",
borderRadius:20,
display:"inline-block",
marginBottom:10
},

heroTitle:{
fontSize:48,
fontWeight:800
},

heroText:{
marginTop:20
},

buttonRow:{
marginTop:20,
display:"flex",
gap:10
},

primaryButton:{
background:"#059669",
color:"white",
padding:"12px 18px",
borderRadius:10,
border:"none",
cursor:"pointer"
},

secondaryButton:{
padding:"12px 18px",
borderRadius:10,
border:"1px solid #ccc"
},

smallNote:{
marginTop:15,
display:"flex",
alignItems:"center",
gap:5
},

card:{
background:"#fff",
border:"1px solid #ddd",
borderRadius:20
},

cardInner:{
padding:30
},

fieldGroup:{
marginBottom:15,
display:"flex",
flexDirection:"column"
},

input:{
padding:10,
borderRadius:8,
border:"1px solid #ccc"
},

successBox:{
padding:20,
background:"#d1fae5",
borderRadius:10
},

featuresSection:{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:20
},

featureCard:{
border:"1px solid #ddd",
padding:20,
borderRadius:10
}

};