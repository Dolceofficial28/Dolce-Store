import React, { useState } from "react";

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const onChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const onSubmit = e => {
        e.preventDefault();
        alert("Thanks! Message captured.");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <main className="app-container">
            <div className="card">
                <h2>Contact</h2>
                <p className="small">Reach out to us — this is a demo form.</p>

                <form className="contact-form" onSubmit={onSubmit} style={{ marginTop: 12 }}>
                    <input className="input" name="name" placeholder="Your name" value={form.name} onChange={onChange} required />
                    <input className="input" name="email" placeholder="Email" type="email" value={form.email} onChange={onChange} required />
                    <textarea className="input" name="message" rows="5" placeholder="Message" value={form.message} onChange={onChange} required />
                    <div style={{ display: "flex", gap: 10 }}>
                        <button className="btn" type="submit">Send</button>
                        <button className="btn ghost" type="button" onClick={() => setForm({ name: "", email: "", message: "" })}>Reset</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Contact;