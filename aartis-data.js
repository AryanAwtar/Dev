/* ========================================================
   COMPREHENSIVE SACRED AARTI DATABASE (WITH SACRED IMAGES & DEVOTIONAL AUDIO)
   All Deities Aarti with Authentic Images, Hindi, Hinglish, Mantra, Bhavarth & Audio Tracks
======================================================== */
const aartisData = [
    {
        "id": "ganesh",
        "title": "श्री गणेश जी की आरती",
        "englishTitle": "Shri Ganesh Ji Ki Aarti",
        "category": "प्रथम पूज्य देव",
        "categoryEn": "Pratham Pujya Vighnaharta",
        "avatar": "🐘",
        "mantraLabel": "गणेश ध्यान मंत्र",
        "mantraLabelEn": "Ganesh Dhyana Mantra",
        "mantra": "ॐ गं गणपतये नमः ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
        "mantraEn": "Om Gam Ganapataye Namah || Vakratunda Mahakaya Suryakoti Samaprabha | Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada ||",
        "about": "भगवान श्री गणेश जी सभी विघ्नों के हर्ता और ऋद्धि-सिद्धि के दाता हैं। किसी भी शुभ कार्य और पूजा का प्रारम्भ श्री गणेश जी की आरती से किया जाता है।",
        "aboutEn": "Bhagwan Shri Ganesh ji sabhi vighno ke harta aur riddhi-siddhi ke daata hain. Kisi bhi shubh karya aur puja ka prarambh Shri Ganesh ji ki aarti se hota hai.",
        "bhavarth": "यह आरती प्रभु गणेश के दिव्य स्वरूप, उनके चार भुजाओं, मोदक भोग, और भक्तों के कष्ट हरने की अपार कृपा का गुणगान करती है।",
        "bhavarthEn": "Yeh aarti prabhu Ganesh ke divya swaroop, unke char bhujaon, modak bhog aur bhakton ke kasht harne ki apar kripa ka gungaan karti hai.",
        "verses": [
            {
                "hi": "जय गणेश, जय गणेश, जय गणेश देवा।\nमाता जाकी पार्वती, पिता महादेवा॥",
                "en": "Jai Ganesh, Jai Ganesh, Jai Ganesh Deva.\nMata Jaki Parvati, Pita Mahadeva."
            },
            {
                "hi": "एक दंत दयावंत, चार भुजा धारी।\nमाथे सिंदूर सोहे, मूसे की सवारी॥\nपान चढ़े फल चढ़े, और चढ़े मेवा।\nलड्डुअन का भोग लगे, संत करें सेवा॥",
                "en": "Ek dant dayavant, char bhuja dhari.\nMathe sindoor sohe, muse ki sawari.\nPaan chadhe phal chadhe, aur chadhe meva.\nLadduan ka bhog lage, sant karein seva."
            },
            {
                "hi": "जय गणेश, जय गणेश, जय गणेश देवा।\nमाता जाकी पार्वती, पिता महादेवा॥",
                "en": "Jai Ganesh, Jai Ganesh, Jai Ganesh Deva.\nMata Jaki Parvati, Pita Mahadeva."
            },
            {
                "hi": "अंधेन को आंख देत, कोढ़िन को काया।\nबांझन को पुत्र देत, निर्धन को माया॥\n'सूर' श्याम शरण आए, सफल कीजे सेवा।\nमाता जाकी पार्वती, पिता महादेवा॥",
                "en": "Andhan ko aankh det, kodhin ko kaya.\nBanjhan ko putra det, nirdhan ko maya.\n'Soor' Shyam sharan aaye, saphal kije seva.\nMata jaki Parvati, pita Mahadeva."
            },
            {
                "hi": "जय गणेश, जय गणेश, जय गणेश देवा।\nमाता जाकी पार्वती, पिता महादेवा॥",
                "en": "Jai Ganesh, Jai Ganesh, Jai Ganesh Deva.\nMata Jaki Parvati, Pita Mahadeva."
            }
        ],
        "image": "images/ganesh.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Ganapati1.jpg?width=600",
        "audioTracks": [
            {
                "id": "ganesh-v1",
                "title": "जय गणेश देवा (Rajshri Soul)",
                "titleEn": "Jai Ganesh Deva (Rajshri Soul)",
                "artist": "Rajshri Soul",
                "file": "audio/ganesh_v1.mp3",
                "duration": "2:38"
            },
            {
                "id": "ganesh-v2",
                "title": "जय गणेश देवा (सुपरफास्ट)",
                "titleEn": "Jai Ganesh Deva (Superfast)",
                "artist": "Superfast",
                "file": "audio/ganesh_v2.mp3",
                "duration": "1:58"
            }
        ]
    },
    {
        "id": "shiv",
        "title": "श्री शिव जी की आरती",
        "englishTitle": "Om Jai Shiv Omkara",
        "category": "त्रिदेव - देवाधिदेव महादेव",
        "categoryEn": "Tridev - Devadhidev Mahadev",
        "avatar": "🔱",
        "mantraLabel": "महामृत्युंजय मंत्र",
        "mantraLabelEn": "Mahamrityunjaya Mantra",
        "mantra": "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृ त्योर्मुक्षीय मामृतात्॥",
        "mantraEn": "Om Tryambakam Yajamahe Sugandhim Pushtivardhanam | Urvarukamiva Bandhanan Mrityor Mukshiya Mamritat ||",
        "about": "महादेव शिव कल्याणकारी, आशुतोष और संहारकर्ता हैं। उनकी यह प्रसिद्ध आरती तीनों लोकों में भगवान भोलेनाथ की महिमा का गुणगान करती है।",
        "aboutEn": "Mahadev Shiv kalyankari, aashutosh aur samhaarkarta hain. Unki yeh prasiddh aarti teeno lokon mein Bhagwan Bholenath ki mahima ka gungaan karti hai.",
        "bhavarth": "इस आरती में ब्रह्मा, विष्णु और सदाशिव के एकात्म भाव और गंगा, त्रिशूल, रुद्राक्ष एवं डमरूधारी शिव की वंदना की गई है।",
        "bhavarthEn": "Is aarti mein Brahma, Vishnu aur Sadashiv ke ekatm bhav aur Ganga, trishul, rudraksha evam damroodhari Shiv ki vandana ki gayi hai.",
        "verses": [
            {
                "hi": "ॐ जय शिव ओंकारा, स्वामी हर शिव ओंकारा।\nब्रह्मा, विष्णु, सदाशिव, अर्द्धांगी धारा॥\nॐ जय शिव ओंकारा॥",
                "en": "Om Jai Shiv Omkara, Swami Har Shiv Omkara.\nBrahma, Vishnu, Sadashiv, Ardhangi dhara.\nOm Jai Shiv Omkara."
            },
            {
                "hi": "एकानन चतुरानन पंचानन राजे।\nहंसासन गरुड़ासन वृषवाहन साजे॥\nॐ जय शिव ओंकारा॥",
                "en": "Ekanan chaturanan panchanan raje.\nHansasan garudasan vrishvahan saje.\nOm Jai Shiv Omkara."
            },
            {
                "hi": "दो भुज चार चतुर्भुज दसभुज अति सोहे।\nत्रिगुण रूप निरखते त्रिभुवन जन मोहे॥\nॐ जय शिव ओंकारा॥",
                "en": "Do bhuj char chaturbhuj dasbhuj ati sohe.\nTrigun roop nirakhate tribhuvan jan mohe.\nOm Jai Shiv Omkara."
            },
            {
                "hi": "अक्षमाला वनमाला मुण्डमाला धारी।\nत्रिपुरारी कंसारी कर माला धारी॥\nॐ जय शिव ओंकारा॥",
                "en": "Akshamala vanamala mundamala dhari.\nTripurari kansari kar mala dhari.\nOm Jai Shiv Omkara."
            },
            {
                "hi": "श्वेताम्बर पीताम्बर बाघम्बर अंगे।\nसनकादिक गरुड़ादिक भूतादिक संगे॥\nॐ जय शिव ओंकारा॥",
                "en": "Shwetambar peetambar baghambar ange.\nSanakadik garudadik bhootadik sange.\nOm Jai Shiv Omkara."
            },
            {
                "hi": "कर के मध्य कमण्डलु चक्र त्रिशूल धरता।\nजगकर्ता जगभर्ता जगसंहारकर्ता॥\nॐ जय शिव ओंकारा॥",
                "en": "Kar ke madhya kamandalu chakra trishool dharta.\nJagkarta jagbharta jagsanharkarta.\nOm Jai Shiv Omkara."
            },
            {
                "hi": "ब्रह्मा विष्णु सदाशिव जानत अविवेका।\nप्रणवाक्षर के मध्ये ये तीनों एका॥\nॐ जय शिव ओंकारा॥",
                "en": "Brahma Vishnu Sadashiv jaanat aviveka.\nPranavakshar ke madhye ye teeno eka.\nOm Jai Shiv Omkara."
            },
            {
                "hi": "काशी में विश्वनाथ विराजत नन्दी ब्रह्मचारी।\nनित उठ दर्शन पावत महिमा अति भारी॥\nॐ जय शिव ओंकारा॥",
                "en": "Kashi mein Vishwanath virajat nandi brahmachari.\nNit uth darshan paavat mahima ati bhaari.\nOm Jai Shiv Omkara."
            },
            {
                "hi": "त्रिगुणशिवजीकीआरती जो कोई नर गावे।\nकहत शिवानन्द स्वामी मनवांछित फल पावे॥\nॐ जय शिव ओंकारा॥",
                "en": "Trigun Shivji ki aarti jo koi nar gaave.\nKahat Shivanand Swami manwanchhit phal paave.\nOm Jai Shiv Omkara."
            }
        ],
        "image": "images/shiv.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Shiva_Parvati_Ganesha.jpg?width=600",
        "audioTracks": [
            {
                "id": "shiv-v1",
                "title": "ॐ जय शिव ओंकारा (महा सुपर फास्ट - २ मिनट)",
                "titleEn": "Om Jai Shiv Omkara (Superfast 2 Min)",
                "artist": "Superfast",
                "file": "audio/shiv.mp3",
                "duration": "2:02"
            }
        ]
    },
    {
        "id": "jagdish",
        "title": "श्री जगदीश (विष्णु) जी की आरती",
        "englishTitle": "Om Jai Jagdish Hare",
        "category": "त्रिदेव - जगत पालनकर्ता",
        "categoryEn": "Tridev - Jagat Palankarta",
        "avatar": "🪷",
        "mantraLabel": "विष्णु मूल मंत्र",
        "mantraLabelEn": "Vishnu Moola Mantra",
        "mantra": "ॐ नमो भगवते वासुदेवाय ॥ शांताकारं भुजगशयनं पद्मनाभं सुरेशं विश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्॥",
        "mantraEn": "Om Namo Bhagavate Vasudevaya || Shantakaram Bhujagashayanam Padmanabham Suresham Vishwadharam Gaganasadrisham Meghavarnam Shubhangam ||",
        "about": "श्री जगदीश आरती विश्व प्रसिद्ध सार्वभौमिक प्रार्थना है, जिसे पंडित श्रद्धाराम फिल्लौरी जी ने रचा था। यह हर हिंदू घर में संध्याकाल और सत्यनारायण कथा में गाई जाती है।",
        "aboutEn": "Shri Jagdish aarti vishwa prasiddh prarthana hai, jo har Hindu ghar mein sandhya samay aur Satyanarayan katha mein gaayi jaati hai.",
        "bhavarth": "यह आरती दीन-दुखियों के संकट हरने वाले, करुणा के सागर श्री हरि विष्णु के चरणों में पूर्ण समर्पण का मार्ग प्रशस्त करती है।",
        "bhavarthEn": "Yeh aarti deen-dukhion ke sankat harne wale, karuna ke saagar Shri Hari Vishnu ke charno mein poorn samarpan ka marg prashast karti hai.",
        "verses": [
            {
                "hi": "ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।\nभक्त जनों के संकट, दास जनों के संकट,\nक्षण में दूर करे॥ ॐ जय जगदीश हरे॥",
                "en": "Om Jai Jagdish Hare, Swami Jai Jagdish Hare.\nBhakt janon ke sankat, daas janon ke sankat,\nKshan mein door kare. Om Jai Jagdish Hare."
            },
            {
                "hi": "जो ध्यावे फल पावे, दुःख बिनसे मन का।\nस्वामी दुःख बिनसे मन का।\nसुख सम्पत्ति घर आवे, सुख सम्पत्ति घर आवे,\nकष्ट मिटे तन का॥ ॐ जय जगदीश हरे॥",
                "en": "Jo dhyave phal paave, dukh binse man ka.\nSwami dukh binse man ka.\nSukh sampatti ghar aave, sukh sampatti ghar aave,\nKasht mite tan ka. Om Jai Jagdish Hare."
            },
            {
                "hi": "मात-पिता तुम मेरे, शरण गहूं किसकी।\nस्वामी शरण गहूं किसकी।\nतुम बिन और न दूजा, तुम बिन और न दूजा,\nआस करूं जिसकी॥ ॐ जय जगदीश हरे॥",
                "en": "Maat-pita tum mere, sharan gahoon kiski.\nSwami sharan gahoon kiski.\nTum bin aur na dooja, tum bin aur na dooja,\nAas karoon jiski. Om Jai Jagdish Hare."
            },
            {
                "hi": "तुम पूरण परमात्मा, तुम अन्तर्यामी।\nस्वामी तुम अन्तर्यामी।\nपारब्रह्म परमेश्वर, पारब्रह्म परमेश्वर,\nतुम सब के स्वामी॥ ॐ जय जगदीश हरे॥",
                "en": "Tum pooran paramatma, tum antaryami.\nSwami tum antaryami.\nParbrahma parameshwar, parbrahma parameshwar,\nTum sab ke swami. Om Jai Jagdish Hare."
            },
            {
                "hi": "तुम करुणा के सागर, तुम पालनकर्ता।\nस्वामी तुम पालनकर्ता।\nमैं मूरख खल कामी, मैं सेवक तुम स्वामी,\nकृपा करो भर्ता॥ ॐ जय जगदीश हरे॥",
                "en": "Tum karuna ke saagar, tum paalankarta.\nSwami tum paalankarta.\nMain moorakh khal kaami, main sevak tum swami,\nKripa karo bharta. Om Jai Jagdish Hare."
            },
            {
                "hi": "तुम हो एक अगोचर, सब के प्राणपति।\nस्वामी सब के प्राणपति।\nकिस विधि मिलूं दयामय, किस विधि मिलूं दयामय,\nतुमको मैं कुमति॥ ॐ जय जगदीश हरे॥",
                "en": "Tum ho ek agochar, sab ke praanpati.\nSwami sab ke praanpati.\nKis vidhi miloon dayamay, kis vidhi miloon dayamay,\nTumko main kumati. Om Jai Jagdish Hare."
            },
            {
                "hi": "दीनबन्धु दुखहर्ता, तुम ठाकुर मेरे।\nस्वामी तुम ठाकुर मेरे।\nअपने हाथ उठाओ, अपनी शरण लगाओ,\nद्वार पड़ा तेरे॥ ॐ जय जगदीश हरे॥",
                "en": "Deenbandhu dukhaharta, tum thaakur mere.\nSwami tum thaakur mere.\nApne haath uthao, apni sharan lagao,\nDwaar pada tere. Om Jai Jagdish Hare."
            },
            {
                "hi": "विषय विकार मिटाओ, पाप हरो देवा।\nस्वमी पाप हरो देवा।\nश्रद्धा भक्ति बढ़ाओ, श्रद्धा भक्ति बढ़ाओ,\nसन्तन की सेवा॥ ॐ जय जगदीश हरे॥",
                "en": "Vishay vikaar mitao, paap haro deva.\nSwami paap haro deva.\nShraddha bhakti badhao, shraddha bhakti badhao,\nSantan ki seva. Om Jai Jagdish Hare."
            },
            {
                "hi": "तन मन धन सब है तेरा, स्वामी सब कुछ है तेरा।\nतेरा तुझको अर्पण, तेरा तुझको अर्पण,\nक्या लागे मेरा॥ ॐ जय जगदीश हरे॥",
                "en": "Tan man dhan sab hai tera, swami sab kuch hai tera.\nTera tujhko arpan, tera tujhko arpan,\nKya laage mera. Om Jai Jagdish Hare."
            }
        ],
        "image": "images/jagdish.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Vishnu_Laxmi_and_Serpent_Anant.jpg?width=600",
        "audioTracks": [
            {
                "id": "jagdish-v1",
                "title": "ॐ जय जगदीश हरे (सुपरफास्ट आरती)",
                "titleEn": "Om Jai Jagdish Hare (Superfast)",
                "artist": "Bhakti",
                "file": "audio/jagdish.mp3",
                "duration": "2:19"
            }
        ]
    },
    {
        "id": "durga",
        "title": "माँ अम्बे (दुर्गा) जी की आरती",
        "englishTitle": "Jai Ambe Gauri",
        "category": "आद्यशक्ति भगवती",
        "categoryEn": "Aadyashakti Bhagwati",
        "avatar": "🦁",
        "mantraLabel": "दुर्गा नवार्ण मंत्र",
        "mantraLabelEn": "Durga Navarna Mantra",
        "mantra": "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे ॥ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥",
        "mantraEn": "Om Aim Hreem Kleem Chamundayai Vichche || Sarvamangala Mangalye Shive Sarvartha Sadhike | Sharanye Tryambake Gauri Narayani Namo'stu Te ||",
        "about": "माँ दुर्गा शक्ति की अधिष्ठात्री देवी हैं, जिन्होंने महिषासुर, शुंभ-निशुंभ आदि असुरों का वध कर धर्म की रक्षा की। नवरात्रि में इस आरती का नित्य पाठ होता है।",
        "aboutEn": "Maa Durga shakti ki adhishthatri devi hain, jinhone Mahishasur aur dushto ka sanghar kar dharmo ki raksha ki. Navratri mein is aarti ka nitya paath hota hai.",
        "bhavarth": "माँ अम्बे के अष्टभुज सिंहवाहिनी स्वरूप और उनके दयालु ममतामयी रूप का मनोहारी वर्णन इस आरती में है।",
        "bhavarthEn": "Maa Ambe ke ashtabhuja sinhvahini swaroop aur unke dayalu mamtamayi roop ka manohari varnan is aarti mein hai.",
        "verses": [
            {
                "hi": "जय अम्बे गौरी, मैया जय श्यामा गौरी।\nतुमको निशिदिन ध्यावत, हरि ब्रह्मा शिवरी॥\nजय अम्बे गौरी॥",
                "en": "Jai Ambe Gauri, Maiya Jai Shyama Gauri.\nTumko nishidin dhyavat, Hari Brahma Shivri.\nJai Ambe Gauri."
            },
            {
                "hi": "मांग सिन्दूर विराजत, टीको मृगमद को।\nउज्ज्वल से दोउ नैना, चन्द्रवदन नीको॥\nजय अम्बे गौरी॥",
                "en": "Maang sindoor virajat, teeko mrigmad ko.\nUjjwal se dou naina, chandravadan neeko.\nJai Ambe Gauri."
            },
            {
                "hi": "कनक समान कलेवर, रक्ताम्बर राजे।\nरक्तपुष्प गल माला, कण्ठन पर साजे॥\nजय अम्बे गौरी॥",
                "en": "Kanak samaan kalevar, raktambar raaje.\nRaktapushpa gal maala, kanthan par saaje.\nJai Ambe Gauri."
            },
            {
                "hi": "केहरि वाहन राजत, खड्ग खप्पर धारी।\nसुर-नर-मुनिजन सेवत, तिनके दुःखहारी॥\nजय अम्बे गौरी॥",
                "en": "Kehari vaahan raajat, khadag khappar dhaari.\nSur-nar-munijan sevat, tinke dukh-haari.\nJai Ambe Gauri."
            },
            {
                "hi": "कानन कुण्डल शोभित, नासाग्रे मोती।\nकोटिक चन्द्र दिवाकर, सम राजत ज्योती॥\nजय अम्बे गौरी॥",
                "en": "Kaanan kundal shobhit, naasaagre moti.\nKotik chandra divaakar, sam raajat jyoti.\nJai Ambe Gauri."
            },
            {
                "hi": "शुम्भ-निशुम्भ बिदारे, महिषासुर घाती।\nधूम्र विलोचन नैना, निशदिन मदमाती॥\nजय अम्बे गौरी॥",
                "en": "Shumbh-nishumbh bidaare, mahishasur ghaati.\nDhoomra vilochan naina, nishidin madmaati.\nJai Ambe Gauri."
            },
            {
                "hi": "चण्ड-मुण्ड संहारे, शोणित बीज हरे।\nमधु-कैटभ दोउ मारे, सुर भयहीन करे॥\nजय अम्बे गौरी॥",
                "en": "Chand-mund samhaare, shonit beej hare.\nMadhu-kaitabh dou maare, sur bhayheen kare.\nJai Ambe Gauri."
            },
            {
                "hi": "ब्रह्माणी, रुद्राणी, तुम कमला रानी।\nआगम निगम बखानी, तुम शिव पटरानी॥\nजय अम्बे गौरी॥",
                "en": "Brahmani, rudrani, tum kamala raani.\nAagam nigam bakhaani, tum Shiv patrane.\nJai Ambe Gauri."
            },
            {
                "hi": "चौंसठ योगिन गावत, नृत्य करत भैरु।\nबाजत ताल मृदंगा, अरु बाजत डमरू॥\nजय अम्बे गौरी॥",
                "en": "Chaunsath yogin gaavat, nritya karat bhairu.\nBaajat taal mridanga, aru baajat damru.\nJai Ambe Gauri."
            },
            {
                "hi": "तुम ही जग की माता, तुम ही हो भरता।\nभक्तन की दुःख हरता, सुख सम्पत्ति करता॥\nजय अम्बे गौरी॥",
                "en": "Tum hi jag ki maata, tum hi ho bharta.\nBhaktan ki dukh harta, sukh sampatti karta.\nJai Ambe Gauri."
            },
            {
                "hi": "भुजा चार अति शोभित, वरमुद्रा धारी।\nमनवांछित फल पावत, सेवत नर नारी॥\nजय अम्बे गौरी॥",
                "en": "Bhuja chaar ati shobhit, varmudra dhaari.\nManwaanchhit phal paavat, sevat nar naari.\nJai Ambe Gauri."
            },
            {
                "hi": "कंचन थाल विराजत, अगर कपूर बाती।\nश्री मालकेतु में राजत, कोटि रतन ज्योती॥\nजय अम्बे गौरी॥",
                "en": "Kanchan thaal viraajat, agar kapoor baati.\nShri Maalketu mein raajat, koti ratan jyoti.\nJai Ambe Gauri."
            },
            {
                "hi": "श्री अम्बे जी की आरती, जो कोई नर गावे।\nकहत शिवानन्द स्वामी, सुख-सम्पत्ति पावे॥\nजय अम्बे गौरी, मैया जय श्यामा गौरी॥",
                "en": "Shri Ambe ji ki aarti, jo koi nar gaave.\nKahat Shivanand Swami, sukh-sampatti paave.\nJai Ambe Gauri, Maiya Jai Shyama Gauri."
            }
        ],
        "image": "images/durga.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Durga_by_Raja_Ravi_Varma.jpg?width=600",
        "audioTracks": [
            {
                "id": "durga-v1",
                "title": "जय अम्बे गौरी (Aartiyan)",
                "titleEn": "Jai Ambe Gauri",
                "artist": "Aartiyan",
                "file": "audio/durga.mp3",
                "duration": "5:00"
            }
        ]
    },
    {
        "id": "hanuman",
        "title": "श्री हनुमान जी की आरती",
        "englishTitle": "Aarti Kije Hanuman Lala Ki",
        "category": "रुद्रावतार संकटमोचन",
        "categoryEn": "Rudravatar Sankatmochan",
        "avatar": "🚩",
        "mantraLabel": "हनुमान बीज मंत्र",
        "mantraLabelEn": "Hanuman Beej Mantra",
        "mantra": "ॐ हं हनुमते रुद्रात्मकाय हुं फट् ॥ मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्। वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥",
        "mantraEn": "Om Ham Hanumate Rudratmakaya Hum Phat || Manojavam Marutatulyavegam Jitendriyam Buddhimatam Varishtham | Vatatmajam Vanarayuthamukhyam Shriramadootam Sharanam Prapadye ||",
        "about": "श्री हनुमान जी अतुलित बल के धाम और प्रभु श्री राम के परम भक्त हैं। यह आरती गोस्वामी तुलसीदास जी द्वारा रचित मानी जाती है, जो सभी भयों का नाश करती है।",
        "aboutEn": "Shri Hanuman ji atulit bal ke dhaam aur prabhu Shri Ram ke param bhakt hain. Yeh aarti sabhi bhayo aur sankaton ka nash karti hai.",
        "bhavarth": "लंका दहन, लक्ष्मण जी के प्राण रक्षक और दैत्य-दानवों का संहार करने वाले बजरंगबली की विजय गाथा।",
        "bhavarthEn": "Lanka dahan, Lakshman ji ke praan rakshak aur asuro ka samhar karne wale Bajrangbali ki vijay gaatha.",
        "verses": [
            {
                "hi": "आरती कीजै हनुमान लला की।\nदुष्ट दलन रघुनाथ कला की॥",
                "en": "Aarti kije Hanuman lala ki.\nDusht dalan Raghunath kala ki."
            },
            {
                "hi": "जाके बल से गिरिवर कांपे।\nरोग दोष जाके निकट न झांके॥\nअंजनि पुत्र महा बलदाई।\nसन्तन के प्रभु सदा सहाई॥\nआरती कीजै हनुमान लला की...",
                "en": "Jaake bal se girivar kaanpe.\nRog dosh jaake nikat na jhaanke.\nAnjani putra maha baldayi.\nSantan ke prabhu sada sahaayi.\nAarti kije Hanuman lala ki..."
            },
            {
                "hi": "दे बीरा रघुनाथ पठाए।\nलंका जारि सिया सुधि लाए॥\nलंका सो कोट समुद्र सी खाई।\nजात पवनसुत बार न लाई॥\nआरती कीजै हनुमान लला की...",
                "en": "De beera Raghunath pathaaye.\nLanka jaari Siya sudhi laaye.\nLanka so kot samudra si khaayi.\nJaat Pawansut baar na laayi.\nAarti kije Hanuman lala ki..."
            },
            {
                "hi": "लंका जारि असुर संहारे।\nसियारामजी के काज संवारे॥\nलक्ष्मण मूर्छित पड़े सकारे।\nआनि संजीवन प्राण उबारे॥\nआरती कीजै हनुमान लला की...",
                "en": "Lanka jaari asur samhaare.\nSiyaramji ke kaaj sanwaare.\nLakshman murchhit pade sakaare.\nAani sanjeevan praan ubaare.\nAarti kije Hanuman lala ki..."
            },
            {
                "hi": "पैठि पताल तोरि जम-कारे।\nअहिरावण की भुजा उखारे॥\nबायें भुजा असुर दल मारे।\nदाहिने भुजा संतजन तारे॥\nआरती कीजै हनुमान लला की...",
                "en": "Paithi pataal tori jam-kaare.\nAhiravan ki bhuja ukhaare.\nBaayein bhuja asur dal maare.\nDaahine bhuja santjan taare.\nAarti kije Hanuman lala ki..."
            },
            {
                "hi": "सुर नर मुनि आरती उतारें।\nजय जय जय हनुमान उचारें॥\nकंचन थार कपूर लौ छाई।\nआरती करत संजना माई॥\nआरती कीजै हनुमान लला की...",
                "en": "Sur nar muni aarti utaarein.\nJai jai jai Hanuman uchaarein.\nKanchan thaar kapoor lau chhaayi.\nAarti karat Sanjana maayi.\nAarti kije Hanuman lala ki..."
            },
            {
                "hi": "जो हनुमानजी की आरती गावै।\nबसि बैकुंठ परम पद पावै॥\nआरती कीजै हनुमान लला की।\nदुष्ट दलन रघुनाथ कला की॥",
                "en": "Jo Hanumanji ki aarti gaavai.\nBasi Baikunth param pad paavai.\nAarti kije Hanuman lala ki.\nDusht dalan Raghunath kala ki."
            }
        ],
        "image": "images/hanuman.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Hanuman_showing_Rama_in_His_heart.jpg?width=600",
        "audioTracks": [
            {
                "id": "hanuman-v1",
                "title": "आरती कीजै हनुमान लला की (सुपरफास्ट)",
                "titleEn": "Aarti Kije Hanuman Lala Ki (Superfast)",
                "artist": "Shri Shyam Bagichi",
                "file": "audio/hanuman.mp3",
                "duration": "1:52"
            }
        ]
    },
    {
        "id": "lakshmi",
        "title": "माँ लक्ष्मी जी की आरती",
        "englishTitle": "Om Jai Lakshmi Mata",
        "category": "धन, वैभव एवं समृद्धि दायिनी",
        "categoryEn": "Dhan, Vaibhav Evam Samriddhi",
        "avatar": "🪙",
        "mantraLabel": "महालक्ष्मी मंत्र",
        "mantraLabelEn": "Mahalakshmi Mantra",
        "mantra": "ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः॥",
        "mantraEn": "Om Shreem Hreem Shreem Kamale Kamalalaye Praseeda Praseeda Shreem Hreem Shreem Om Mahalakshmyai Namah ||",
        "about": "माँ लक्ष्मी जी भगवान श्री हरि विष्णु की अर्धांगिनी और धन, ऐश्वर्य, सौभाग्य की देवी हैं। दीपावली के पावन पर्व पर यह आरती श्रद्धापूर्वक की जाती है।",
        "aboutEn": "Maa Lakshmi ji Bhagwan Vishnu ki ardhangini aur dhan, aishwarya, saubhagya ki devi hain. Deepawali par inki vishesh aarti hoti hai.",
        "bhavarth": "माँ लक्ष्मी की कृपा से ही घर में सुख-समृद्धि, धर्म, यश और ज्ञान का वास होता है।",
        "bhavarthEn": "Maa Lakshmi ki kripa se hi ghar mein sukh-samriddhi, satkarma, yash aur gyan ka vaas hota hai.",
        "verses": [
            {
                "hi": "ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।\nतुमको निशदिन सेवत, हर विष्णु विधाता॥\nॐ जय लक्ष्मी माता॥",
                "en": "Om Jai Lakshmi Mata, Maiya Jai Lakshmi Mata.\nTumko nishidin sevat, Har Vishnu Vidhata.\nOm Jai Lakshmi Mata."
            },
            {
                "hi": "उमा, रमा, ब्रह्माणी, तुम ही जग-माता।\nसूर्य-चन्द्रमा ध्यावत, नारद ऋषि गाता॥\nॐ जय लक्ष्मी माता॥",
                "en": "Uma, Rama, Brahmani, tum hi jag-mata.\nSurya-Chandrama dhyavat, Narad rishi gaata.\nOm Jai Lakshmi Mata."
            },
            {
                "hi": "दुर्गा रूप निरंजनि, सुख सम्पति दाता।\nजो कोई तुमको ध्यावत, ऋद्धि-सिद्धि धन पाता॥\nॐ जय लक्ष्मी माता॥",
                "en": "Durga roop niranjani, sukh sampatti daata.\nJo koi tumko dhyavat, riddhi-siddhi dhan paata.\nOm Jai Lakshmi Mata."
            },
            {
                "hi": "तुम पाताल-निवासिनि, तुम ही शुभदाता।\nकर्म-प्रभाव-प्रकाशिनी, भव-निधि की त्राता॥\nॐ जय लक्ष्मी माता॥",
                "en": "Tum pataal-nivasini, tum hi shubhdaata.\nKarm-prabhav-prakashini, bhav-nidhi ki traata.\nOm Jai Lakshmi Mata."
            },
            {
                "hi": "जिस घर तुम रहती, तहँ सब सद्गुण आता।\nसब सम्भव हो जाता, मन नहिं घबराता॥\nॐ जय लक्ष्मी माता॥",
                "en": "Jis ghar tum rehti, tahan sab sadgun aata.\nSab sambhav ho jaata, man nahin ghabraata.\nOm Jai Lakshmi Mata."
            },
            {
                "hi": "तुम बिन यज्ञ न होते, वस्त्र न कोई पाता।\nखान-पान का वैभव, सब तुमसे आता॥\nॐ जय लक्ष्मी माता॥",
                "en": "Tum bin yagya na hote, vastra na koi paata.\nKhaan-paan ka vaibhav, sab tumse aata.\nOm Jai Lakshmi Mata."
            },
            {
                "hi": "शुभ-गुण-मंदिर सुंदर, क्षीरोदधि-जाता।\nरत्न चतुर्दश तुम बिन, कोई नहिं पाता॥\nॐ जय लक्ष्मी माता॥",
                "en": "Shubh-gun-mandir sundar, ksheerodadhi-jaata.\nRatna chaturdash tum bin, koi nahin paata.\nOm Jai Lakshmi Mata."
            },
            {
                "hi": "महालक्ष्मीजी की आरती, जो कोई नर गावे।\nउर आनन्द समावे, पाप उतर जावे॥\nॐ जय लक्ष्मी माता॥",
                "en": "Mahalakshmiji ki aarti, jo koi nar gaave.\nUr aanand samaave, paap utar jaave.\nOm Jai Lakshmi Mata."
            }
        ],
        "image": "images/lakshmi.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Lakshmi_by_Raja_Ravi_Varma.jpg?width=600",
        "audioTracks": [
            {
                "id": "lakshmi-v1",
                "title": "ॐ जय लक्ष्मी माता (सुपरफास्ट)",
                "titleEn": "Om Jai Lakshmi Mata (Superfast)",
                "artist": "Superfast",
                "file": "audio/lakshmi.mp3",
                "duration": "1:58"
            }
        ]
    },
    {
        "id": "ram",
        "title": "श्री राम चंद्र जी की आरती",
        "englishTitle": "Shri Ram Chandra Kripalu Bhajuman",
        "category": "मर्यादा पुरुषोत्तम प्रभु",
        "categoryEn": "Maryada Purushottam Prabhu",
        "avatar": "🏹",
        "mantraLabel": "राम तारक मंत्र",
        "mantraLabelEn": "Ram Taraka Mantra",
        "mantra": "श्री राम जय राम जय जय राम ॥ रामाय रामभद्राय रामचन्द्राय वेधसे। रघुनाथाय नाथाय सीतायाः पतये नमः॥",
        "mantraEn": "Shri Ram Jai Ram Jai Jai Ram || Ramaya Rambhadraya Ramachandraya Vedhase | Raghunathaya Nathaya Sitayah Pataye Namah ||",
        "about": "श्री राम जी भगवान विष्णु के सातवें अवतार हैं, जिन्होंने अधर्म का नाश कर 'रामराज्य' की स्थापना की। यह स्तुति गोस्वामी तुलसीदास जी कृत विनय पत्रिका से ली गई है।",
        "aboutEn": "Shri Ram ji Bhagwan Vishnu ke satvein avatar hain. Yeh stuti Goswami Tulsidas ji krit Vinay Patrika se li gayi hai.",
        "bhavarth": "अति सुंदर नवकंज लोचन, कंज मुख और धनुर्धारी प्रभु श्री राम के कल्याणकारी स्वरूप की अनुपम स्तुति।",
        "bhavarthEn": "Navkanj lochan, kanj mukh aur dhanurdhari prabhu Shri Ram ke kalyankari swaroop ki anupam stuti.",
        "verses": [
            {
                "hi": "श्रीरामचन्द्र कृपालु भजु मन हरण भवभय दारुणं।\nनवकंज लोचन, कंज मुख, कर कंज, पद कंजारुणं॥",
                "en": "Shri Ramchandra kripalu bhaju man haran bhavbhay daarunam.\nNavkanj lochan, kanj mukh, kar kanj, pad kanjaarunam."
            },
            {
                "hi": "कन्दर्प अगणित अमित छवि, नवनील नीरद सुन्दरं।\nपट पीत मानहु तड़ित रुचि शुचि नौमि जनक सुतावरं॥",
                "en": "Kandarp aganit amit chhavi, navneel neerad sundaram.\nPat peet maanahu tadit ruchi shuchi naumi Janak sutaavaram."
            },
            {
                "hi": "भजु दीनबन्धु दिनेश दानव दैत्यवंश निकन्दनं।\nरघुनन्द आनन्दकन्द कोशलचन्द दशरथ नन्दनं॥",
                "en": "Bhaju deenbandhu dinesh daanav daityavansh nikandanam.\nRaghunand aanandkand Kaushalachand Dasharath nandanam."
            },
            {
                "hi": "सिर मुकुट कुण्डल तिलक चारु उदारु अङ्ग विभूषणं।\nआजानुभुज शर चाप धर, संग्राम-जित-खरदूषणं॥",
                "en": "Sir mukut kundal tilak chaaru udaaru anga vibhooshanam.\nAajaanubhuj shar chaap dhar, sangraam-jit-khardooshanam."
            },
            {
                "hi": "इति वदति तुलसीदास शंकर शेष मुनि-मन-रंजनं।\nमम हृदय-कंज निवास कुरु, कामादि खल-दल-मंजनं॥",
                "en": "Iti vadati Tulsidas Shankar Shesh muni-man-ranjanam.\nMam hriday-kanj nivaas kuru, kaamaadi khal-dal-manjanam."
            },
            {
                "hi": "मनु जाहिं राचेउ मिलिहि सो बरु सहज सुंदर सांवरो।\nकरुना निधान सुजान सीलु सनेहु जानत रावरो॥",
                "en": "Manu jaahin raacheu milihi so baru sahaj sundar saanvaro.\nKaruna nidhaan sujaan seelu sanehu jaanat raavoro."
            }
        ],
        "image": "images/ram.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Ramapanchayan,_Raja_Ravi_Varma_(Lithograph).jpg?width=600",
        "audioTracks": [
            {
                "id": "ram-v1",
                "title": "श्री रामचन्द्र कृपालु भजु मन (राम स्तुति)",
                "titleEn": "Shri Ram Chandra Kripalu Bhajman",
                "artist": "Bhakti Bhajan",
                "file": "audio/ram.mp3",
                "duration": "3:23"
            }
        ]
    },
    {
        "id": "krishna",
        "title": "श्री कृष्ण (कुंजबिहारी) जी की आरती",
        "englishTitle": "Aarti Kunj Bihari Ki",
        "category": "पूर्ण पुरुषोत्तम भगवान",
        "categoryEn": "Poorna Purushottam Bhagwan",
        "avatar": "🪈",
        "mantraLabel": "कृष्ण महामंत्र",
        "mantraLabelEn": "Krishna Mahamantra",
        "mantra": "हरे कृष्ण हरे कृष्ण, कृष्ण कृष्ण हरे हरे। हरे राम हरे राम, राम राम हरे हरे॥",
        "mantraEn": "Hare Krishna Hare Krishna, Krishna Krishna Hare Hare | Hare Ram Hare Ram, Ram Ram Hare Hare ||",
        "about": "श्री कृष्ण भगवान विष्णु के आठवें अवतार हैं। उनकी यह मनमोहक आरती ब्रज की दिव्य भूमि, यमुना तट और बांसुरी की मधुर तान का साक्षात्कार कराती है।",
        "aboutEn": "Shri Krishna Bhagwan Vishnu ke aathvein avatar hain. Unki yeh aarti Braj ki divya bhoomi, Yamuna tat aur bansuri ki madhur taan ka sakshatkar karati hai.",
        "bhavarth": "मोर मुकुटधारी, पीताम्बर सुहाए और गोवर्धनधारी कन्हैया के अलौकिक प्रेममय रूप की वंदना।",
        "bhavarthEn": "Mor mukutdhari, peetambar suhaye aur Govardhandhari Kanhaiya ke alaukik prem-may roop ki vandana.",
        "verses": [
            {
                "hi": "आरती कुंजबिहारी की, श्री गिरिधर कृष्णमुरारी की॥\nगले में बैजंती माला, बजावै मुरली मधुर बाला।\nश्रवण में कुण्डल झलकाला, नंद के आनंद नंदलाला।\nश्री गिरिधर कृष्णमुरारी की॥\nआरती कुंजबिहारी की...",
                "en": "Aarti Kunjbihari ki, Shri Giridhar Krishnamurari ki.\nGale mein baijanti maala, bajaavei murli madhur baala.\nShravan mein kundal jhalkaala, Nand ke aanand Nandlaala.\nShri Giridhar Krishnamurari ki.\nAarti Kunjbihari ki..."
            },
            {
                "hi": "कनकमय मुकुट बिलस रह्यो, लटक बहु भृकुटि बिलस रह्यो।\nनयन सुखदायक अति सोहे, चरण रज देखत मन मोहे।\nश्री गिरिधर कृष्णमुरारी की॥\nआरती कुंजबिहारी की...",
                "en": "Kanakmay mukut bilas rahyo, latak bahu bhrikuti bilas rahyo.\nNayan sukhdayak ati sohe, charan raj dekhat man mohe.\nShri Giridhar Krishnamurari ki.\nAarti Kunjbihari ki..."
            },
            {
                "hi": "जहाँ ते प्रगट भई गंगा, कलुष कलि हारिणि श्री गंगा।\nस्मरन ते होत मोह भंगा, बसी शिव शीश जटा जंगा।\nश्री गिरिधर कृष्णमुरारी की॥\nआरती कुंजबिहारी की...",
                "en": "Jahaan te pragat bhayi Ganga, kalush kali haarini Shri Ganga.\nSmaran te hot moh bhanga, basi Shiv sheesh jata janga.\nShri Giridhar Krishnamurari ki.\nAarti Kunjbihari ki..."
            },
            {
                "hi": "चमकती उज्ज्वल तट पर छांह, बजत मुरली यमुना की छांह।\nनचत गोपी संग बनवारी, पियत रस रास रसिक भारी।\nश्री गिरिधर कृष्णमुरारी की॥\nआरती कुंजबिहारी की...",
                "en": "Chamakati ujjwal tat par chhanh, bajat murli Yamuna ki chhanh.\nNachat gopi sang banwaari, piyat ras raas rasik bhaari.\nShri Giridhar Krishnamurari ki.\nAarti Kunjbihari ki..."
            }
        ],
        "image": "images/krishna.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Radha_Madhavam.jpg?width=600",
        "audioTracks": [
            {
                "id": "krishna-v1",
                "title": "आरती कुंजबिहारी की (सुपरफास्ट)",
                "titleEn": "Aarti Kunj Bihari Ki (Superfast)",
                "artist": "Superfast",
                "file": "audio/krishna.mp3",
                "duration": "1:33"
            }
        ]
    },
    {
        "id": "saraswati",
        "title": "माँ सरस्वती जी की आरती",
        "englishTitle": "Jai Saraswati Mata",
        "category": "विद्या, वाणी एवं संगीत की देवी",
        "categoryEn": "Vidya, Vaani Evam Sangeet",
        "avatar": "🪕",
        "mantraLabel": "सरस्वती वंदना",
        "mantraLabelEn": "Saraswati Vandana",
        "mantra": "या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना॥",
        "mantraEn": "Ya Kundendu Tusharahara Dhavala Ya Shubhra Vastravrita | Ya Veenavaradanda Manditakara Ya Shvetapadmasana ||",
        "about": "माँ सरस्वती ज्ञान, बुद्धि, कला, संगीत और विवेक की दात्री हैं। बसंत पंचमी एवं विद्यार्थियों द्वारा विद्या अध्ययन से पूर्व इनकी विशेष अर्चना होती है।",
        "aboutEn": "Maa Saraswati gyan, buddhi, kala, sangeet aur vivek ki datri hain. Basant Panchami par inki vishesh archana hoti hai.",
        "bhavarth": "श्वेत पद्मासना, वीणावादिनी और हंसवाहिनी माँ सरस्वती से अज्ञान के अंधकार को मिटाकर ज्ञान का प्रकाश फैलाने की प्रार्थना।",
        "bhavarthEn": "Shweta padmasana, veenavadini Maa Saraswati se agyan ke andhkar ko mita kar gyan ka prakash phailane ki prarthana.",
        "verses": [
            {
                "hi": "जय सरस्वती माता, मैया जय सरस्वती माता।\nसदगुण वैभव शालिनि, त्रिभुवन विख्याता॥\nजय सरस्वती माता॥",
                "en": "Jai Saraswati Mata, Maiya Jai Saraswati Mata.\nSadgun vaibhav shalini, tribhuvan vikhyata.\nJai Saraswati Mata."
            },
            {
                "hi": "चन्द्रवदनि पद्मासिनि, द्युति मंगलकारी।\nसोहे शुभ हंस सवारी, अतुल तेजधारी॥\nजय सरस्वती माता॥",
                "en": "Chandravadani padmasini, dyuti mangalkaari.\nSohe shubh hans sawari, atul tejdhaari.\nJai Saraswati Mata."
            },
            {
                "hi": "बाएं कर में वीणा, दाएं कर माला।\nशीश मुकुट मणि सोहे, गल मोतियन माला॥\nजय सरस्वती माता॥",
                "en": "Baayein kar mein veena, daayein kar maala.\nSheesh mukut mani sohe, gal motiyan maala.\nJai Saraswati Mata."
            },
            {
                "hi": "देवी शरण जो आए, उनका उद्धार किया।\nबैठी मंथरा दासी, रावण संहार किया॥\nजय सरस्वती माता॥",
                "en": "Devi sharan jo aaye, unka uddhaar kiya.\nBaithi Manthara daasi, Raavan samhaar kiya.\nJai Saraswati Mata."
            },
            {
                "hi": "विद्या दान प्रदायिनि, ज्ञान प्रकाश भरो।\nमोह अज्ञान तिमिर का, जग से नाश करो॥\nजय सरस्वती माता॥",
                "en": "Vidya daan pradaayini, gyan prakaash bharo.\nMoh agyan timir ka, jag se naash karo.\nJai Saraswati Mata."
            },
            {
                "hi": "धूप दीप फल मेवा, माँ स्वीकार करो।\nज्ञानचक्षु दे माता, जग निस्तार करो॥\nजय सरस्वती माता॥",
                "en": "Dhoop deep phal meva, maa sweekar karo.\nGyaanchakshu de mata, jag nistaar karo.\nJai Saraswati Mata."
            }
        ],
        "image": "images/saraswati.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Goddess_Saraswati_by_Raja_Ravi_Varma,_1896.jpg?width=600",
        "audioTracks": []
    },
    {
        "id": "kali",
        "title": "माँ काली जी की आरती",
        "englishTitle": "Mangal Ki Seva Sun Meri Deva",
        "category": "शत्रु-नाशक महाकाली",
        "categoryEn": "Shatru-Nashak Mahakali",
        "avatar": "⚔️",
        "mantraLabel": "काली बीज मंत्र",
        "mantraLabelEn": "Kali Beej Mantra",
        "mantra": "ॐ क्रीं कालिकायै नमः ॥ ॐ जयन्ती मङ्गला काली भद्रकाली कपालिनी। दुर्गा क्षमा शिवा धात्री स्वाहा स्वधा नमोऽस्तु ते॥",
        "mantraEn": "Om Kreem Kalikayai Namah || Om Jayanti Mangala Kali Bhadrakali Kapalini | Durga Kshama Shiva Dhatri Swaha Swadha Namo'stu Te ||",
        "about": "माँ काली दुष्टों और आसुरी शक्तियों का संहार करने वाली उग्र रूपा भगवती हैं, जो अपने भक्तों के लिए परम दयामयी और ममतामयी माँ हैं।",
        "aboutEn": "Maa Kali dushto aur aasuri shaktiyo ka sanhar karne wali ugra roopa bhagwati hain, jo bhakton ke liye param dayamayi hain.",
        "bhavarth": "माँ काली के खड्गधारी, मुण्डमालिनी रूप की सेवा और अकाल मृत्यु व नकारात्मक शक्तियों से रक्षा की गुहार।",
        "bhavarthEn": "Maa Kali ke khadgadhari, mundamalini roop ki seva aur akaal mrityu va bhay se raksha ki guhar.",
        "verses": [
            {
                "hi": "मंगल की सेवा सुन मेरी देवा, हाथ जोड़ तेरे द्वार खड़े।\nपान सुपारी ध्वजा नारियल, ले ज्वाला तेरी भेंट धरे॥\nसुन जगदम्बे कर न विलम्बे, संतन के भंडार भरे।\nमंगल की सेवा सुन मेरी देवा...",
                "en": "Mangal ki seva sun meri deva, haath jod tere dwaar khade.\nPaan supari dhwaja nariyal, le jwala teri bhent dhare.\nSun Jagdambe kar na vilambe, santan ke bhandaar bhare.\nMangal ki seva sun meri deva..."
            },
            {
                "hi": "सतयुग द्वापर त्रेता मध्ये, कलयुग में परचण्ड भई।\nकंचन थार कपूर की बाती, आरती करत आनंद भई॥\nसुन जगदम्बे कर न विलम्बे, संतन के भंडार भरे।\nमंगल की सेवा सुन मेरी देवा...",
                "en": "Satyug Dwapar Treta madhye, Kalyug mein parchanda bhayi.\nKanchan thaar kapoor ki baati, aarti karat aanand bhayi.\nSun Jagdambe kar na vilambe, santan ke bhandaar bhare.\nMangal ki seva sun meri deva..."
            },
            {
                "hi": "रोल कपोल सिंदूर विराजे, टीको मृगमद को लीनो।\nगले में मुंड की माला विराजे, खप्पर हाथ में लीनो॥\nसुन जगदम्बे कर न विलम्बे, संतन के भंडार भरे।\nमंगल की सेवा सुन मेरी देवा...",
                "en": "Rol kapol sindoor viraaje, teeko mrigmad ko leeno.\nGale mein mund ki maala viraaje, khappar haath mein leeno.\nSun Jagdambe kar na vilambe, santan ke bhandaar bhare.\nMangal ki seva sun meri deva..."
            },
            {
                "hi": "सिंह सवारी सोहे भवानी, बाजे शंख शहनाई हो।\nजो कोई माँ की आरती गावे, वाके पाप सब जाई हो॥\nसुन जगदम्बे कर न विलम्बे, संतन के भंडार भरे।\nमंगल की सेवा सुन मेरी देवा...",
                "en": "Sinh sawaari sohe Bhawani, baaje shankh shehnaayi ho.\nJo koi maa ki aarti gaave, waake paap sab jaayi ho.\nSun Jagdambe kar na vilambe, santan ke bhandaar bhare.\nMangal ki seva sun meri deva..."
            }
        ],
        "image": "images/kali.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Kali_by_Raja_Ravi_Varma.jpg?width=600",
        "audioTracks": []
    },
    {
        "id": "surya",
        "title": "सूर्य देव जी की आरती",
        "englishTitle": "Jai Kashyap Nandan",
        "category": "प्रत्यक्ष देवता - नवग्रह अधिपति",
        "categoryEn": "Pratyaksha Devta - Surya",
        "avatar": "☀️",
        "mantraLabel": "सूर्य गायत्री मंत्र",
        "mantraLabelEn": "Surya Gayatri Mantra",
        "mantra": "ॐ आदित्याय विद्महे भास्कराय धीमहि तन्नो भानुः प्रचोदयात् ॥ ॐ सूर्याय नमः॥",
        "mantraEn": "Om Aadityaya Vidmahe Bhaskaraya Dhimahi Tanno Bhanuh Prachodayat || Om Suryaya Namah ||",
        "about": "भगवान सूर्य प्रत्यक्ष देव हैं जिनकी किरणों से समस्त चराचर जगत में जीवन, ऊर्जा, स्वास्थ्य और तेज का संचार होता है।",
        "aboutEn": "Bhagwan Surya pratyaksha dev hain jinki kirno se samast sansar mein jeevan, urja, swasthya aur tej ka sanchar hota hai.",
        "bhavarth": "सप्त अश्वरथारूढ़, अंधकार विनाशक और आरोग्य प्रदाता दिवाकर की भक्ति वंदना।",
        "bhavarthEn": "Sapta ashwarath-aroodh, andhkar vinashak aur aarogya pradata divakar ki bhakti vandana.",
        "verses": [
            {
                "hi": "जय कश्यप-नन्दन, ॐ जय अदिति नन्दन।\nत्रिभुवन - तिमिर - निकन्दन, भक्त-हृदय-चन्दन॥\nजय कश्यप-नन्दन...",
                "en": "Jai Kashyap-nandan, Om Jai Aditi nandan.\nTribhuvan - timir - nikandan, bhakt-hriday-chandan.\nJai Kashyap-nandan..."
            },
            {
                "hi": "सप्त-अश्वरथ राजित, एक चक्र-धारी।\nदुःख-हारी, सुख-कारी, मानस-मल-हारी॥\nजय कश्यप-नन्दन...",
                "en": "Sapt-ashwarath raajit, ek chakra-dhaari.\nDukh-haari, sukh-kaari, maanas-mal-haari.\nJai Kashyap-nandan..."
            },
            {
                "hi": "सुर - मुनि - भूसुर - वन्दित, विमल विभव-शाली।\nअघ-दल-दलन दिवाकर, दिव्य किरण-माली॥\nजय कश्यप-नन्दन...",
                "en": "Sur - muni - bhoosur - vandit, vimal vibhav-shaali.\nAgh-dal-dalan divakar, divya kiran-maali.\nJai Kashyap-nandan..."
            },
            {
                "hi": "सकल-सुकर्म-प्रसविता, सविता शुभकारी।\nविश्व-विलोचन, मोचन-भव-बंधन भारी॥\nजय कश्यप-नन्दन...",
                "en": "Sakal-sukarm-prasavita, savita shubhkaari.\nVishwa-vilochan, mochan-bhav-bandhan bhaari.\nJai Kashyap-nandan..."
            },
            {
                "hi": "कमल-समूह-विकासक, व्योम-विहारण-हार।\nप्राण-रूप, करुणामय, जीवन-आधार॥\nजय कश्यप-नन्दन...",
                "en": "Kamal-samooh-vikaasak, vyom-vihaaran-haar.\nPraan-roop, karunaamay, jeevan-aadhaar.\nJai Kashyap-nandan..."
            }
        ],
        "image": "images/surya.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Surya_poster.jpg?width=600",
        "audioTracks": [
            {
                "id": "surya-v1",
                "title": "ॐ जय कश्यप नन्दन (सूर्य देव आरती)",
                "titleEn": "Om Jai Kashyap Nandan (Surya Dev)",
                "artist": "Superfast",
                "file": "audio/surya.mp3",
                "duration": "1:54"
            }
        ]
    },
    {
        "id": "ganga",
        "title": "माँ गंगा जी की आरती",
        "englishTitle": "Om Jai Gange Mata",
        "category": "मोक्षदायिनी पतितपावनी",
        "categoryEn": "Mokshadayini Patit-Pavani",
        "avatar": "🌊",
        "mantraLabel": "गंगा ध्यान मंत्र",
        "mantraLabelEn": "Ganga Dhyana Mantra",
        "mantra": "गंगे च यमुने चैव गोदावरि सरस्वति। नर्मदे सिन्धु कावेरि जलेऽस्मिन् संनिधिं कुरु॥",
        "mantraEn": "Gange Cha Yamune Chaiva Godavari Saraswati | Narmade Sindhu Kaveri Jalesmin Sannidhim Kuru ||",
        "about": "माँ गंगा स्वर्ग से शिव की जटाओं में उतरकर पृथ्वी पर भागीरथ के तप से अवतरित हुईं। इनके दर्शन और स्पर्श मात्र से जन्म-जन्मांतर के पाप कट जाते हैं।",
        "aboutEn": "Maa Ganga swarg se shiv ki jataon mein utarkar prithvi par Bhagirath ke tap se aayi. Inke darshan se paap nasht hote hain.",
        "bhavarth": "हरिद्वार, काशी और प्रयागराज के पावन तटों पर नित्य गुंजायमान होने वाली पतित पावनी माँ गंगा की आरती।",
        "bhavarthEn": "Haridwar, Kashi aur Prayagraj ke pawan tat par nitya gunjnewali patit pavani Maa Ganga ki aarti.",
        "verses": [
            {
                "hi": "ॐ जय गंगे माता, श्री जय गंगे माता।\nजो नर तुमको ध्याता, मनवांछित फल पाता॥\nॐ जय गंगे माता॥",
                "en": "Om Jai Gange Mata, Shri Jai Gange Mata.\nJo nar tumko dhyata, manwaanchhit phal paata.\nOm Jai Gange Mata."
            },
            {
                "hi": "चन्द्रसी जोत तुम्हारी, जल निर्मल आता।\nशरण पड़े जो तेरी, सो नर तर जाता॥\nॐ जय गंगे माता॥",
                "en": "Chandrasi jot tumhari, jal nirmal aata.\nSharan pade jo teri, so nar tar jaata.\nOm Jai Gange Mata."
            },
            {
                "hi": "पुत्र सगर के तारे, सब जग को ज्ञाता।\nकृपा दृष्टि तुम्हारी, त्रिभुवन सुखदाता॥\nॐ जय गंगे माता॥",
                "en": "Putra Sagar ke taare, sab jag ko gyaata.\nKripa drishti tumhari, tribhuvan sukhdaata.\nOm Jai Gange Mata."
            },
            {
                "hi": "एक ही बार जो नर, तेरी शरण आता।\nयम की त्रास मिटाकर, परम पद पाता॥\nॐ जय गंगे माता॥",
                "en": "Ek hi baar jo nar, teri sharan aata.\nYam ki traas mitaakar, param pad paata.\nOm Jai Gange Mata."
            },
            {
                "hi": "आरती मात तुम्हारी, जो जन नित गाता।\nदास वही सहज में, मुक्ति को पाता॥\nॐ जय गंगे माता॥",
                "en": "Aarti maat tumhari, jo jan nit gaata.\nDaas wahi sahaj mein, mukti ko paata.\nOm Jai Gange Mata."
            }
        ],
        "image": "images/ganga.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/GANGA.jpg?width=600",
        "audioTracks": [
            {
                "id": "ganga-v1",
                "title": "जय गंगे माता (सुपरफास्ट)",
                "titleEn": "Jai Gange Mata (Superfast)",
                "artist": "Glare Music Bhakti",
                "file": "audio/ganga_v1.mp3",
                "duration": "1:37"
            },
            {
                "id": "ganga-v2",
                "title": "ॐ जय गंगे माता (Jai Jai TV)",
                "titleEn": "Om Jai Gange Mata (Jai Jai TV)",
                "artist": "Jai Jai TV",
                "file": "audio/ganga_v2.mp3",
                "duration": "4:00"
            },
            {
                "id": "ganga-v3",
                "title": "ॐ जय गंगे माता (अंजलि जैन)",
                "titleEn": "Om Jai Gange Mata (Anjali Jain)",
                "artist": "Anjali Jain",
                "file": "audio/ganga_v3.mp3",
                "duration": "3:34"
            }
        ]
    },
    {
        "id": "gayatri",
        "title": "माँ गायत्री जी की आरती",
        "englishTitle": "Jayati Jay Gayatri Mata",
        "category": "वेदमाता देवमाता",
        "categoryEn": "Vedmata Devmata",
        "avatar": "📿",
        "mantraLabel": "गायत्री महामंत्र",
        "mantraLabelEn": "Gayatri Mahamantra",
        "mantra": "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥",
        "mantraEn": "Om Bhur Bhuvah Swah Tat Savitur Varenyam Bhargo Devasya Dhimahi Dhiyo Yo Nah Prachodayat ||",
        "about": "माँ गायत्री समस्त चारों वेदों की जननी हैं। इनके मंत्र के जप से बुद्धि तीव्र, आत्मबल जाग्रत और चित्त शुद्ध होता है।",
        "aboutEn": "Maa Gayatri samast charo vedon ki janani hain. Inke mantra jap se buddhi teevra aur aatmbal jaagrat hota hai.",
        "bhavarth": "सद्बुद्धि और सद्ज्ञान की प्रदात्री, हंसवाहिनी त्रिकाल संध्या रूपी माँ गायत्री की दिव्य वंदना।",
        "bhavarthEn": "Sadbuddhi aur sadgyan ki pradatree, hansvahini Maa Gayatri ki divya vandana.",
        "verses": [
            {
                "hi": "जयति जय गायत्री माता, जयति जय गायत्री माता।\nसत्-चित्-आनन्द-स्वरूपिणी, जग-त्राता॥\nजयति जय गायत्री माता...",
                "en": "Jayati Jay Gayatri Mata, Jayati Jay Gayatri Mata.\nSat-chit-aanand-swaroopini, jag-traata.\nJayati Jay Gayatri Mata..."
            },
            {
                "hi": "रक्त-वर्ण, हंस-वाहिनी, कमलासन-संस्था।\nअक्षसूत्र, कमण्डलु, पुस्तक, शुभ-हस्ता॥\nजयति जय गायत्री माता...",
                "en": "Rakt-varna, hans-vaahini, kamalaasan-sanstha.\nAkshasootra, kamandalu, pustak, shubh-hasta.\nJayati Jay Gayatri Mata..."
            },
            {
                "hi": "वेद-माता, जग-जननी, बुद्धि-प्रदायिनी।\nपाप-ताप-निवारिणी, मुक्ति-विधायिनी॥\nजयति जय गायत्री माता...",
                "en": "Ved-mata, jag-janani, buddhi-pradaayini.\nPaap-taap-nivaarini, mukti-vidhaayini.\nJayati Jay Gayatri Mata..."
            },
            {
                "hi": "जो कोई ध्यावे मन से, फल वांछित पावे।\nदुःख-दारिद्र्य नशावे, आनंद उर आवे॥\nजयति जय गायत्री माता...",
                "en": "Jo koi dhyave man se, phal waanchhit paave.\nDukh-daaridrya nashaave, aanand ur aave.\nJayati Jay Gayatri Mata..."
            }
        ],
        "image": "images/gayatri.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Gayatri1.jpg?width=600",
        "audioTracks": []
    },
    {
        "id": "saibaba",
        "title": "श्री साईं बाबा की आरती",
        "englishTitle": "Aarti Sai Baba",
        "category": "शिरडी के अवधूत संत",
        "categoryEn": "Shirdi Ke Avadhoot Sant",
        "avatar": "🏵️",
        "mantraLabel": "साईं तारक मंत्र",
        "mantraLabelEn": "Sai Taraka Mantra",
        "mantra": "ॐ शिर्डी वासाय विद्महे सच्चिदानन्दाय धीमहि तन्नो साईं प्रचोदयात् ॥ सबका मालिक एक॥",
        "mantraEn": "Om Shirdi Vasaya Vidmahe Sachchidanandaya Dhimahi Tanno Sai Prachodayat || Sabka Malik Ek ||",
        "about": "शिरडी के साईं बाबा ने 'श्रद्धा' और 'सबूरी' का पावन संदेश दिया। वे अपने भक्तों के कष्टों को क्षण भर में दूर करने वाले दयानिधि हैं।",
        "aboutEn": "Shirdi ke Sai Baba ne 'Shraddha' aur 'Saburi' ka pawan sandesh diya. Ve bhakton ke kasht dur karne wale dayani-dhi hain.",
        "bhavarth": "शिरडी तीर्थ के कण-कण में बसे साईं के प्रेम और शरणागति का पावन गुणगान।",
        "bhavarthEn": "Shirdi teerth ke kan-kan mein base Sai ke prem aur sharanagati ka pawan gungaan.",
        "verses": [
            {
                "hi": "आरती साईं बाबा, सौख्यदातार जीवा। चरणरजातली, द्यावा दासां विसावा॥\nआरती साईं बाबा...",
                "en": "Aarti Sai Baba, saukhyadaataar jeeva. Charan-raja-tali, dyaawa daasaan visaawa.\nAarti Sai Baba..."
            },
            {
                "hi": "जाळुनिया आनंग, स्वस्वरूपीं राहे दंगा। मुमुक्षु जनां दावी, निज डोळां श्रीरंगा॥\nआरती साईं बाबा...",
                "en": "Jaaluniya aananga, swaswaroopin raahe danga. Mumukshu janaan daavi, nij dolaan Shriranga.\nAarti Sai Baba..."
            },
            {
                "hi": "जया मनीं जैसा भाव, तया तैसा अनुभव। दाविसी दयाघना, ऐसी तुझी ही माव॥\nआरती साईं बाबा...",
                "en": "Jayaa manin jaisa bhaav, tayaa taisa anubhav. Daavisi dayaaghana, aisi tujhi hi maav.\nAarti Sai Baba..."
            },
            {
                "hi": "तुमचे नाम ध्यातां, हरे भवव्यथा। आगाध तव करणी, मार्ग दावी सुलभता॥\nआरती साईं बाबा...",
                "en": "Tumche naam dhyataan, hare bhavavyatha. Aagaadh tav karni, maarg daavi sulabhata.\nAarti Sai Baba..."
            }
        ],
        "image": "images/saibaba.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Shirdi_Sai_Baba.jpg?width=600",
        "audioTracks": []
    },
    {
        "id": "khatushyam",
        "title": "श्री खाटू श्याम जी की आरती",
        "englishTitle": "Om Jai Shri Shyam Hare",
        "category": "कलयुग अवतारी - लखदातार",
        "categoryEn": "Kalyug Avatari - Lakhdataar",
        "avatar": "🌸",
        "mantraLabel": "श्याम शरण मंत्र",
        "mantraLabelEn": "Shyam Sharan Mantra",
        "mantra": "ॐ श्री श्याम देवाय नमः ॥ ॐ मोर्वी नन्दनाय विद्महे श्याम देवाय धीमहि तन्नो श्यामः प्रचोदयात्॥",
        "mantraEn": "Om Shri Shyam Devaya Namah || Om Morvi Nandanaya Vidmahe Shyam Devaya Dhimahi Tanno Shyamah Prachodayat ||",
        "about": "खाटू श्याम जी को भगवान श्री कृष्ण द्वारा कलयुग में अपने नाम से पूजे जाने का वरदान प्राप्त है। इन्हें हारे का सहारा और शीश का दानी कहा जाता है।",
        "aboutEn": "Khatu Shyam ji ko Bhagwan Shri Krishna dwara Kalyug mein apne naam se pooje jaane ka vardaan mila. Inhe haare ka sahara kehte hain.",
        "bhavarth": "सुंदर चंवर, मोरछड़ी और केसर तिलक धारण किए भक्तों के सभी कष्ट दूर करने वाले बाबा श्याम की आरती।",
        "bhavarthEn": "Sundar chanwar, morchhari aur kesar tilak dharan kiye bhakton ke sabhi kasht door karne wale Baba Shyam ki aarti.",
        "verses": [
            {
                "hi": "ॐ जय श्री श्याम हरे, बाबा जय श्री श्याम हरे।\nखाटू धाम विराजत, अनुपम रूप धरे॥\nॐ जय श्री श्याम हरे...",
                "en": "Om Jai Shri Shyam Hare, Baba Jai Shri Shyam Hare.\nKhatu Dhaam virajat, anupam roop dhare.\nOm Jai Shri Shyam Hare..."
            },
            {
                "hi": "रतन जड़ित सिंहासन, सिर पर चंवर ढुरे।\nतन पर केसर चन्दन, मन उपवन महके॥\nॐ जय श्री श्याम हरे...",
                "en": "Ratan jadit singhasan, sir par chanwar dhure.\nTan par kesar chandan, man upvan mahke.\nOm Jai Shri Shyam Hare..."
            },
            {
                "hi": "गल पुष्पों की माला, केसर तिलक धरे।\nमोरछड़ी लहरावे, संकट दूर करे॥\nॐ जय श्री श्याम हरे...",
                "en": "Gal pushpon ki maala, kesar tilak dhare.\nMorchhari lahraave, sankat door kare.\nOm Jai Shri Shyam Hare..."
            },
            {
                "hi": "कुण्डल श्रवण विराजत, नैनन तेज भरे।\nजो जन ध्यान लगावे, भवसागर निस्तरे॥\nॐ जय श्री श्याम हरे...",
                "en": "Kundal shravan virajat, nainan tej bhare.\nJo jan dhyaan lagave, bhavsaagar nistare.\nOm Jai Shri Shyam Hare..."
            },
            {
                "hi": "हारे के तुम सहारे, बाबा लखदाता।\nकृपा करो मुरलीधर, सुख सम्पति दाता॥\nॐ जय श्री श्याम हरे...",
                "en": "Haare ke tum sahaare, baba lakhdaata.\nKripa karo Murlidhar, sukh sampatti daata.\nOm Jai Shri Shyam Hare..."
            },
            {
                "hi": "श्री श्याम बिहारी जी की आरती, जो कोई नर गावे।\nकहत 'आलूसिंह' स्वामी, मनवांछित फल पावे॥\nॐ जय श्री श्याम हरे, बाबा जय श्री श्याम हरे॥",
                "en": "Shri Shyam Bihari ji ki aarti, jo koi nar gaave.\nKahat Alusingh Swami, manwanchhit phal paave.\nOm Jai Shri Shyam Hare, Baba Jai Shri Shyam Hare."
            }
        ],
        "image": "images/khatushyam.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Khatu_shyam.jpg?width=600",
        "audioTracks": []
    },
    {
        "id": "shanidev",
        "title": "श्री शनि देव जी की आरती",
        "englishTitle": "Jai Jai Shri Shanidev",
        "category": "कर्मफल प्रदाता - सूर्यपुत्र",
        "categoryEn": "Karmaphal Pradata - Shani",
        "avatar": "🪐",
        "mantraLabel": "शनि बीज मंत्र",
        "mantraLabelEn": "Shani Beej Mantra",
        "mantra": "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः ॥ ॐ नीलांजन समाभासं रविपुत्रं यमाग्रजम्। छायामार्तण्ड सम्भूतं तं नमामि शनैश्चरम्॥",
        "mantraEn": "Om Pram Preem Proum Sah Shanaishcharaya Namah || Om Neelanjana Samabhasam Raviputram Yamagrajam | Chhayamartanda Sambhootam Tam Namami Shanaishcharam ||",
        "about": "भगवान शनि देव न्याय और कर्मफल के अधिपति हैं। वे सत्कर्म करने वालों पर प्रसन्न होकर अपार कृपा बरसाते हैं और साढ़ेसाती/ढैय्या के कष्टों से मुक्ति दिलाते हैं।",
        "aboutEn": "Bhagwan Shani Dev nyay aur karmaphal ke adhipati hain. Ve satkarma karne walon par kripa barsate hain aur kashto se mukti dilate hain.",
        "bhavarth": "नीलाम्बरधारी, चतुर्भुज शनि देव की वंदना से सभी ग्रह दोष शांत होते हैं और जीवन में स्थायित्व व सुख आता है।",
        "bhavarthEn": "Neelambardhari, chaturbhuj Shani Dev ki vandana se sabhi graha dosh shant hote hain.",
        "verses": [
            {
                "hi": "जय जय श्री शनिदेव भक्तन हितकारी।\nसूरज के पुत्र प्रभु छाया महतारी॥\nजय जय श्री शनिदेव...",
                "en": "Jai Jai Shri Shanidev bhaktan hitkaari.\nSooraj ke putra prabhu chhaya mahtaari.\nJai Jai Shri Shanidev..."
            },
            {
                "hi": "श्याम अंग वक्र दृष्ट चतुर्भुजा धारी।\nनीलाम्बर धार नाथ गज की असवारी॥\nजय जय श्री शनिदेव...",
                "en": "Shyam ang vakra drisht chaturbhuja dhaari.\nNeelaambar dhaar naath gaj ki aswaari.\nJai Jai Shri Shanidev..."
            },
            {
                "hi": "क्रीट मुकुट शीश राजित दिपत है लिलारी।\nमुक्तन की माला गले शोभित बलिहारी॥\nजय जय श्री शनिदेव...",
                "en": "Kreet mukut sheesh raajit dipat hai lilaari.\nMuktan ki maala gale shobhit balihaari.\nJai Jai Shri Shanidev..."
            },
            {
                "hi": "मोदक मिष्ठान पान चढ़त हैं सुपारी।\nलोहा तिल तेल उड़द महिषी अति प्यारी॥\nजय जय श्री शनिदेव...",
                "en": "Modak mishthan paan chadhat hain supaari.\nLoha til tel urad mahishi ati pyaari.\nJai Jai Shri Shanidev..."
            },
            {
                "hi": "देव दनुज ऋषि मुनि सब कहें जय जयकारी।\nधन्य शनि देव प्रभु रक्षा करो हमारी॥\nजय जय श्री शनिदेव भक्तन हितकारी॥",
                "en": "Dev danuj rishi muni sab kahein jai jaikaari.\nDhanya Shani Dev prabhu raksha karo hamaari.\nJai Jai Shri Shanidev bhaktan hitkaari."
            }
        ],
        "image": "images/shanidev.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Shani_Deva.jpg?width=600",
        "audioTracks": []
    },
    {
        "id": "santoshi",
        "title": "माँ संतोषी जी की आरती",
        "englishTitle": "Jai Santoshi Mata",
        "category": "सुख-शांति प्रदायिनी",
        "categoryEn": "Sukh-Shanti Pradayini",
        "avatar": "🌺",
        "mantraLabel": "संतोषी माता मंत्र",
        "mantraLabelEn": "Santoshi Mata Mantra",
        "mantra": "ॐ श्री सन्तोषी महालक्ष्म्यै नमः ॥ सुखदात्री माता संतोषी नमो नमः॥",
        "mantraEn": "Om Shri Santoshi Mahalakshmyai Namah || Sukhdatri Mata Santoshi Namo Namah ||",
        "about": "माँ संतोषी भगवान श्री गणेश की पुत्री मानी जाती हैं। शुक्रवार व्रत और इनकी पावन आरती से परिवार में स्नेह, तृप्ति और संतोष का वास होता है।",
        "aboutEn": "Maa Santoshi Bhagwan Ganesh ki putri maani jaati hain. Shukrawar vrat aur inki aarti se parivar mein prem aur santosh aata hai.",
        "bhavarth": "गुड़-चना प्रिय, स्वर्ण सिंहासन विराजित माँ संतोषी से दरिद्रता और अशांति दूर करने की प्रार्थना।",
        "bhavarthEn": "Gud-chana priya, swarna singhasan virajit Maa Santoshi se daridrata aur ashanti door karne ki prarthana.",
        "verses": [
            {
                "hi": "जय सन्तोषी माता, मैया जय सन्तोषी माता।\nअपने सेवक जन को, सुख संपति दाता॥\nजय सन्तोषी माता...",
                "en": "Jai Santoshi Mata, Maiya Jai Santoshi Mata.\nApne sevak jan ko, sukh sampati daata.\nJai Santoshi Mata..."
            },
            {
                "hi": "सुन्दर चीर सुनहरी, मां धारण कीन्हो।\nहीरा पन्ना दमके, मुकुट शीश दीन्हो॥\nजय सन्तोषी माता...",
                "en": "Sundar cheer sunahari, maa dhaaran keenho.\nHeera panna damke, mukut sheesh deenho.\nJai Santoshi Mata..."
            },
            {
                "hi": "घंटा ताल मृदंगा, बाजै सहनाई।\nआरती करत भक्त जन, कान्हर कन्हाई॥\nजय सन्तोषी माता...",
                "en": "Ghanta taal mridanga, baaje sahnaayi.\nAarti karat bhakt jan, kaanhar kanhaayi.\nJai Santoshi Mata..."
            },
            {
                "hi": "स्वर्ण सिंहासन बैठी, चंवर ढुरें प्यारे।\nधूप दीप नैवेद्य, धरत मात द्वारे॥\nजय सन्तोषी माता...",
                "en": "Swarna singhasan baithi, chanwar dhurein pyaare.\nDhoop deep naivedya, dharat maat dwaare.\nJai Santoshi Mata..."
            },
            {
                "hi": "गुड़ और चना परमप्रिय, तामें संतोष कियो।\nजीवन सफल भयो जब, दर्शन मात दियो॥\nजय सन्तोषी माता...",
                "en": "Gud aur chana parampriya, taamen santosh kiyo.\nJeevan saphal bhayo jab, darshan maat diyo.\nJai Santoshi Mata..."
            },
            {
                "hi": "ध्यान धरे जो कोई, वांछित फल पावे।\nसंकट टरें सारे, सुख-सम्पत्ति आवे॥\nजय सन्तोषी माता, मैया जय सन्तोषी माता॥",
                "en": "Dhyaan dhare jo koi, waanchhit phal paave.\nSankat tarein saare, sukh-sampatti aave.\nJai Santoshi Mata, Maiya Jai Santoshi Mata."
            }
        ],
        "image": "images/santoshi.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Santoshi_Mata.jpg?width=600",
        "audioTracks": []
    },
    {
        "id": "brihaspati",
        "title": "श्री वृहस्पति (गुरु) देव की आरती",
        "englishTitle": "Jai Brihaspati Deva",
        "category": "ज्ञान, विवेक एवं नवग्रह गुरु",
        "categoryEn": "Gyan, Vivek Evam Guru",
        "avatar": "🌟",
        "mantraLabel": "गुरु वंदना मंत्र",
        "mantraLabelEn": "Guru Vandana Mantra",
        "mantra": "ॐ बृं बृहस्पतये नमः ॥ देवानां च ऋषीणां च गुरुं काञ्चनसन्निभम्। बुद्धिभूतं त्रिलोकेशं तं नमामि बृहस्पतिम्॥",
        "mantraEn": "Om Brim Brihaspataye Namah || Devanam Cha Rishinam Cha Gurum Kanchanasannibham | Buddhibhootam Trilokesham Tam Namami Brihaspatim ||",
        "about": "देवगुरु बृहस्पति देवताओं के मार्गदर्शक, ज्ञान, विद्या और आध्यात्मिक उन्नति के अधिष्ठाता हैं। गुरुवार को इनकी आरती करने से विद्या, यश और सद्बुद्धि प्राप्त होती है।",
        "aboutEn": "Devaguru Brihaspati devtaon ke margdarshak aur aadhyatmik unnati ke swami hain. Guruwar ko inki aarti karne se vidya aur yash milta hai.",
        "bhavarth": "पीताम्बरधारी, कदली फल भोग प्रिय जगतगुरु बृहस्पति देव की ज्ञानवर्धक स्तुति।",
        "bhavarthEn": "Peetambardhari, kadali phal bhog priya jagatguru Brihaspati Dev ki gyanvardhak stuti.",
        "verses": [
            {
                "hi": "जय वृहस्पति देवा, ॐ जय वृहस्पति देवा।\nछिन-छिन भोग लगाऊं, कदली फल मेवा॥\nजय वृहस्पति देवा...",
                "en": "Jai Brihaspati Deva, Om Jai Brihaspati Deva.\nChhin-chhin bhog lagaoon, kadali phal meva.\nJai Brihaspati Deva..."
            },
            {
                "hi": "तुम पूर्ण परमात्मा, तुम अन्तर्यामी।\nजगतपिता जगदीश्वर, तुम सबके स्वामी॥\nजय वृहस्पति देवा...",
                "en": "Tum pooran paramatma, tum antaryami.\nJagatpita jagdeeshwar, तुम sabke swami.\nJai Brihaspati Deva..."
            },
            {
                "hi": "चरणामृत निज निर्मल, सब पातक हरता।\nसकल मनोरथ दायक, कृपा करो भर्ता॥\nजय वृहस्पति देवा...",
                "en": "Charanamrit nij nirmal, sab paatak harta.\nSakal manorath daayak, kripa karo bharta.\nJai Brihaspati Deva..."
            },
            {
                "hi": "तन, मन, धन अर्पण कर, जो जन शरण पड़े।\nप्रभु पद पंकज पावन, भव से पार तरे॥\nजय वृहस्पति देवा...",
                "en": "Tan, man, dhan arpan kar, jo jan sharan pade.\nPrabhu pad pankaj paavan, bhav se paar tare.\nJai Brihaspati Deva..."
            },
            {
                "hi": "सकल मनोरथ पूरण, करते गुरु देवा।\nआरती जो कोई गावे, पावे प्रभु सेवा॥\nजय वृहस्पति देवा, ॐ जय वृहस्पति देवा॥",
                "en": "Sakal manorath pooran, karte guru deva.\nAarti jo koi gaave, paave prabhu seva.\nJai Brihaspati Deva, Om Jai Brihaspati Deva."
            }
        ],
        "image": "images/brihaspati.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Brihaspati_graha_(crop).jpg?width=600",
        "audioTracks": []
    },
    {
        "id": "bhairav",
        "title": "श्री काल भैरव जी की आरती",
        "englishTitle": "Jai Bhairav Deva",
        "category": "काशी कोतवाल - भय एवं संकट नाशक",
        "categoryEn": "Kashi Kotwal - Bhairav",
        "avatar": "🐕",
        "mantraLabel": "बटुक भैरव मंत्र",
        "mantraLabelEn": "Batuk Bhairav Mantra",
        "mantra": "ॐ ह्रीं बटुकाय आपदुद्धारणाय कुरु कुरु बटुकाय ह्रीं ॐ नमः शिवाय॥",
        "mantraEn": "Om Hreem Batukaya Aapad-uddharanaya Kuru Kuru Batukaya Hreem Om Namah Shivaya ||",
        "about": "भगवान काल भैरव शिवजी के उग्र अवतार और काशी नगरी के रक्षक कोतवाल हैं। इनकी उपासना से भय, बाधा, तंत्र-मंत्र और शत्रुओं का शमन होता है।",
        "aboutEn": "Bhagwan Kaal Bhairav Shivji ke ugra avatar aur Kashi nagari ke rakshak kotwal hain. Inki upasana se sabhi bhay dur hote hain.",
        "bhavarth": "डमरू और त्रिशूलधारी, चौंसठ योगिनी संग नृत्यरत भैरवनाथ की कृपा से अकाल मृत्यु का भय टलता है।",
        "bhavarthEn": "Damroo aur trishuldhari Bhairavnath ki kripa se akaal mrityu ka bhay talta hai.",
        "verses": [
            {
                "hi": "जय भैरव देवा, प्रभु जय भैरव देवा।\nसुर नर मुनि सब करहीं, निशिदिन प्रभु सेवा॥\nजय भैरव देवा...",
                "en": "Jai Bhairav Deva, Prabhu Jai Bhairav Deva.\nSur nar muni sab karheen, nishidin prabhu seva.\nJai Bhairav Deva..."
            },
            {
                "hi": "चौंसठ योगिन नाचत, गावत सब नारी।\nबाजत ताल मृदंगा, डमरू भयहारी॥\nजय भैरव देवा...",
                "en": "Chaunsath yogin naachat, gaavat sab naari.\nBaajat taal mridanga, damroo bhayhaari.\nJai Bhairav Deva..."
            },
            {
                "hi": "शूल त्रिशूल डमरू, कर में अति सोहै।\nबटुक रूप लखि सुंदर, सुर नर मुनि मोहै॥\nजय भैरव देवा...",
                "en": "Shool trishool damroo, kar mein ati sohai.\nBatuk roop lakhi sundar, sur nar muni mohai.\nJai Bhairav Deva..."
            },
            {
                "hi": "कर त्रिशूल वर डमरू, मुंडमाल धारी।\nकाशी के कोतवाल, संकट दुखहारी॥\nजय भैरव देवा...",
                "en": "Kar trishool var damroo, mundmaal dhaari.\nKaashi ke kotwaal, sankat dukh-haari.\nJai Bhairav Deva..."
            },
            {
                "hi": "जो जन ध्यान लगावे, मनवांछित फल पावे।\nकहत शिवानन्द स्वामी, भवसागर तर जावे॥\nजय भैरव देवा, प्रभु जय भैरव देवा॥",
                "en": "Jo jan dhyaan lagave, manwaanchhit phal paave.\nKahat Shivanand Swami, bhavsaagar tar jaave.\nJai Bhairav Deva, Prabhu Jai Bhairav Deva."
            }
        ],
        "image": "images/bhairav.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Kaal-Bhairav.jpg?width=600",
        "audioTracks": []
    },
    {
        "id": "samapan",
        "title": "आरती समापन एवं शांति मंत्र",
        "englishTitle": "Karpur Gauram & Shanti Mantra",
        "category": "आरती समापन एवं पुष्पांजलि",
        "categoryEn": "Aarti Samapan Evam Shanti",
        "avatar": "🪔",
        "mantraLabel": "कपूर आरती मंत्र",
        "mantraLabelEn": "Karpur Aarti Mantra",
        "mantra": "कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम्। सदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥",
        "mantraEn": "Karpur-gauram Karunavataram Sansar-saram Bhujagendra-haram | Sada-vasantam Hridayaaravinde Bhavam Bhavani-sahitam Namami ||",
        "about": "प्रत्येक आरती के पश्चात कर्पूरगौरं, त्वमेव माता एवं विश्व शांति की मंगल कामना हेतु शांति पाठ करना वैदिक परंपरा का अनिवार्य नियम है।",
        "aboutEn": "Pratyek aarti ke baad Karpurgauram, Tvameva Mata evam vishwa shanti prarthana karna anivarya niyam hai.",
        "bhavarth": "ईश्वर के प्रति पूर्ण शरणागति और समस्त ब्रह्मांड में शांति, सौहार्द व कल्याण की प्रार्थना।",
        "bhavarthEn": "Ishwar ke prati poorn sharanagati aur samast brahmand mein shanti va kalyan ki mangal kamana.",
        "verses": [
            {
                "hi": "कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम्।\nसदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥",
                "en": "Karpur-gauram karunaavataram sansaar-saaram bhujagendra-haaram.\nSada-vasantam hridayaaravinde bhavam bhavaani-sahitam namaami."
            },
            {
                "hi": "त्वमेव माता च पिता त्वमेव, त्वमेव बन्धुश्च सखा त्वमेव।\nत्वमेव विद्या द्रविणं त्वमेव, त्वमेव सर्वं मम देव देव॥",
                "en": "Tvameva mata cha pita tvameva, tvameva bandhushcha sakha tvameva.\nTvameva vidya dravinam tvameva, tvameva sarvam mama deva deva."
            },
            {
                "hi": "कायेन वाचा मनसेन्द्रियैर्वा बुद्ध्यात्मना वा प्रकृतिस्वभावात्।\nकरोमि यद्यत् सकलं परस्मै नारायणायेति समर्पयामि॥",
                "en": "Kaayena vaacha manasendriyairva buddhyaatmana va prakritiswabhavaat.\nKaromi yadyat sakalam parasmai Narayanaayeti samarpayaami."
            },
            {
                "hi": "ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः।\nवनस्पतयः शान्तिर्विश्वेदेवाः शान्तिर्ब्रह्म शान्तिः सर्वं शान्तिः शान्तिरेव शान्तिः सा मा शान्तिरेधि॥\nॐ शान्तिः शान्तिः शान्तिः॥",
                "en": "Om Dyauh shaantir-antariksham shaantih prithivi shaantir-aapah shaantiroshadhayah shaantih.\nVanashpatayah shaantir-vishvedevaah shaantir-brahma shaantih sarvam shaantih shaantireva shaantih saa maa shaantiredhi.\nOm Shaantih Shaantih Shaantih."
            }
        ],
        "image": "images/samapan.jpg",
        "onlineImage": "https://commons.wikimedia.org/wiki/Special:FilePath/Aarti_Arati_Lamp_for_Puja,_Prayers_Hinduism.jpg?width=600",
        "audioTracks": [
            {
                "id": "samapan-v1",
                "title": "कर्पूरगौरं करुणावतारम् (राहुल वैद्य)",
                "titleEn": "Karpur Gauram Karunavataram (Rahul Vaidya)",
                "artist": "Rahul Vaidya",
                "file": "audio/samapan.mp3",
                "duration": "1:40"
            }
        ]
    }
];
