const Loader = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "40px 0" }}>
        <div style={{ position: "relative", width: 70, height: 70 }}>
            <div style={{
                position: "absolute", inset: 0,
                border: "3px solid rgba(255,255,255,0.1)",
                borderTopColor: "#60c8ff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
            }} />
            <div style={{
                position: "absolute", inset: 8,
                border: "3px solid rgba(255,255,255,0.05)",
                borderBottomColor: "#a78bfa",
                borderRadius: "50%",
                animation: "spin 1.5s linear infinite reverse",
            }} />
            <div style={{
                position: "absolute", inset: 16,
                background: "radial-gradient(circle, #60c8ff55, transparent)",
                borderRadius: "50%",
                animation: "pulse 2s ease-in-out infinite",
            }} />
        </div>
        <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Syne', sans-serif", letterSpacing: 3, fontSize: 12, textTransform: "uppercase" }}>
            Fetching weather...
        </p>
    </div>
);

export default Loader;
