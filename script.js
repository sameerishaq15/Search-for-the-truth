async function handleSearch() {
    const query = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('result');
    
    // Yahan wo key dalein jo aistudio.google.com se milegi
    const apiKey = "YAHAN_APNI_NEW_KEY_DALEIN"; 

    if (!query) {
        resultDiv.innerHTML = "<p style='color:red;'>Sawal likhein...</p>";
        return;
    }

    resultDiv.innerHTML = "<p>Searching in Sahih Bukhari & Muslim...</p>";

    try {
        // Yeh URL sabse stable hai free keys ke liye
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Answer this Islamic question: "${query}" using authentic references from Quran, Sahih Bukhari and Sahih Muslim. Reply in Roman Urdu.` }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = `<p style='color:red;'>Error: ${data.error.message}</p>`;
            return;
        }

        const answer = data.candidates[0].content.parts[0].text;
        resultDiv.innerHTML = `
            <div style="background:#fff; border-left:6px solid #c5a059; padding:20px; border-radius:10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin-top:20px;">
                <h4 style="color:#1a472a; margin:0 0 10px 0;">Jawab:</h4>
                <div style="line-height:1.6; color:#333; white-space: pre-wrap;">${answer}</div>
            </div>`;
            
    } catch (error) {
        resultDiv.innerHTML = "<p style='color:red;'>Connection issue. Please check your internet.</p>";
    }
}
