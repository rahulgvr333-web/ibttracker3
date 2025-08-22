// ആവശ്യമായ പാക്കേജുകൾ ഇമ്പോർട്ട് ചെയ്യുക
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config(); // .env ഫയലിലെ വേരിയബിളുകൾ ലോഡ് ചെയ്യുന്നു

// Express ആപ്ലിക്കേഷൻ ഉണ്ടാക്കുന്നു
const app = express();

// ഡാറ്റാബേസ് കണക്ഷനുള്ള വിവരങ്ങൾ
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Kunjuvava@1', // നിങ്ങളുടെ പാസ്‌വേർഡ് ഇവിടെ നൽകുക
    database: process.env.DB_DATABASE || 'ibt_tracker_db'
};

let db;

// ഡാറ്റാബേസുമായി ബന്ധിപ്പിക്കാനുള്ള ഫംഗ്ഷൻ
const connectToDb = async () => {
    try {
        db = await mysql.createConnection(dbConfig);
        console.log('✅ MySQL ഡാറ്റാബേസുമായി വിജയകരമായി ബന്ധിപ്പിച്ചു!');
        return db;
    } catch (err) {
        console.error('❌ ഡാറ്റാബേസ് കണക്ഷൻ പരാജയപ്പെട്ടു:', err);
        throw err; // പിശക് മുകളിലേക്ക് അയയ്ക്കുന്നു
    }
};

// സെർവർ ആരംഭിക്കുന്നതിനുള്ള ഫംഗ്ഷൻ
const startServer = async () => {
    try {
        await connectToDb(); // ഡാറ്റാബേസ് കണക്ഷനുവേണ്ടി കാത്തിരിക്കുന്നു

        // പോർട്ട് വേരിയബിൾ .env ഫയലിൽ നിന്നോ അല്ലെങ്കിൽ 3000 പോർട്ടോ ഉപയോഗിക്കുന്നു
        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log(`✅ സെർവർ പോർട്ട് ${port}-ൽ പ്രവർത്തിക്കുന്നു`);
        });

    } catch (err) {
        console.error('❌ സെർവർ ആരംഭിക്കാൻ കഴിഞ്ഞില്ല:', err);
        process.exit(1); // പിശക് സംഭവിച്ചാൽ സെർവർ നിർത്തുന്നു
    }
};

// ആപ്ലിക്കേഷൻ ആരംഭിക്കുന്നു
startServer();