Where its @ - Martin Hagegård Webb25, april/maj 2026

Externa bibliotek jag använt mig av:

// Swiper - TicketsList.jsx

Swiper tycker jag passar i den här appen för att det är ett snyggt sätt att presentera biljetter på, när de är fler än 1 (vilket de ofta är). Utan Swiper läggs biljetterna i en lista som man scrollar ner och upp i, medans detta ger en chansen att presentera dem i en kortlek, där man bara swipar fram och tillbaka mellan alla biljetter, vilket jag tycker är både snyggare och smidigare.
Swiper har flera olika specifika layout-lösningar, men jag valde just kortleks-layout-lösningen av ovanstående anledningar.

Jag har använt Swiper genom att låta mina biljetter (TicketItem.jsx) presenteras som en kortlek istället för en uppradad rad av biljetter.

Swiper fungerar genom import av Swiper (hela karusellen) och SwiperSlide (de enskilda sidorna i karusellen, som Swiper behöver som barn-element). Man importerar även Swipers grundläggande stil och, i mitt fall, kortlekseffektens specifika stil.

På Swiper-karusell-komponenten lägger jag så på ett par olika props/egenskaper. modules={[EffectCards]} registrerar EffectCard-pluginen (inom det generella Swiper), effect="cards" säger vilken effekt inom den pluginen som ska användas, och grabCursor={true} gör muspekaren till en hand vid hovring.

Sedan mappar jag varje biljett i tickets-arrayen till varsina SwiperSlide's, och i varje SwiperSlide renderas ett TicketItem, med biljett-datan.

// Framer Motion - LandingPage.jsx, EventItem.jsx, EventsList.jsx, Button.jsx

Framer Motion tycker jag passar bra i appen för att det ger ett snyggare och lite proffsigare intryck med animationer av element (om de är bra gjorda), kanske speciellt när man öppnar upp appen (när man får den presenterad för sig). Under vanlig navigering sen är jag mer försiktig med det, då tycker jag man riskerar att störa mer än bidra till upplevelsen.

Jag har använt Framer Motion framförallt genom intro-animationer, på landningssidan och vidare in på sidan när eventen presenteras. Skulle man däremot senare i sin navigering kommer tillbaka till event-sidan så har jag stängt av animeringen för det. Har även en nertrycknings-animation för när man trycker på knappen som lägger biljetter i varukorgen, vilket jag tycker ser läckert ut (ihop med hot toast-pop-uppen som också dyker upp då).

Man importerar "motion" från "framer-motion" (vilket görs på LandingPage.jsx, EventItem.jsx, EventsList.jsx och Button.jsx). Detta ger HTML-element chansen att få animationsförmågor, via motion-versioner av dem.

Sedan skickar jag en uppsjö av props och grejer till höger och vänster, det enklaste är nog att få hela uppbyggnaden av detta förklarat för sig inom sin kontext. Gör detta i ovan nämnda filer genom intilliggande kommentarer. Hänvisar dit för dessa genomgångar.

LandingPage.jsx är, precis som Button.jsx, fristående.
EventItem.jsx och EventsList.jsx är dock sammankopplade genom att EventItem.jsx är barn till EventsList.jsx, och delar genom detta animationsstyrningen.

// Hot Toast - App.jsx, EventPage.jsx

Hot Toast tycker jag passar bra i denna appen för att det är en beställningsapp av något slag, den innehåller en varukorg. Och när man lägger något i varukorgen så känns det bra att få en bekräftelse på när man gör det (utöver att cart-ikonen "bara" uppdateras med ett nummer (eller uppdaterar sitt existerande nummer)). Dvs en go visuell bekräftelse på att man lyckats med det, på ett snyggt sätt, vilket Hot Toast har just en inbyggd snygg animation för.

Jag använder den när användaren är på Event-sidan, och trycker på knappen "Lägg i varukorgen". Plopp säger det, så hoppar den fram från knappen i en fade-in, och gör efter ett tag en fade tillbaka ner igen.

Till att börja med importerar jag komponenten "Toaster" globalt i App.jsx. Den ger förutsättningar för ett toast-pop-up-fönster (vilket jag senare gör i EventPage.jsx, genom import av "toast" där). Genom denna globala import, och placering utanför RouterProvider, så "finns" den alltid i appen (dvs behöver inte mountas/unmountas vid navigation). Med props i Toaster styr jag dessutom pop-uppens placering på skärmen.

Väl på EventPage.jsx så anropar jag toast-pop-uppen vid klick på "Lägg i varukorgen"-knappen, och skapar också en animerad grön bock bredvid pop-up-texten, allt genom "toast.success("Tillagt i varukorgen!")".

Har även lagt till en useEffect som avbryter en påbörjad toast-pop-up-animation om användaren navigerar vidare innan animationen är klar.

// Confetti - TicketsPage.jsx

Confetti tycker jag passar bra i den här appen eftersom det är en rolig effekt-förstärkare för när man precis fått igenom något roligt - ett genomfört köp av biljett/biljetter till ett event!

Har använt confetti i appen genom att aktivera den effekten för den precisa stunden när användaren får igenom sitt biljettköp. Däremot är den effekten avstängd i alla andra fall av navigering till biljett-sidan, eftersom det i de fallen mer är en fråga om ren information om vilken eller vilka biljetter som användaren redan har eller inte har (inte lika starkt nyhetsvärde).

Jag importerar confetti (som är en enda "vanlig" funktion) i TicketsPage.jsx. Om man kommer till den sidan via OrderPage.jsx så anropar jag confetti-funktionen (genom en if-sats i en useEffect). Jag skickar med några presentationsdetaljer för confettin, och med window.history.replaceState({}, ""); så ser jag också till att man heller inte kan trigga effekten genom att ladda om sidan.

// Barcode - TicketItem.jsx

Barcode passar bra i appen eftersom varje biljett behöver en streckkod!

Har använt den genom att applicera en barcode på varje biljett.

Jag importerar Barcode-komponenten i TicketItem.jsx, vilket renderar en streckkod som svg-fil direkt i DOM:en.
Lägger sedan Barcode-komponenten där den ska vara i layouten, och stylar upp den direkt med diverse props. För genomgång av beskrivningar av dessa, se mina kommentarer i TicketItem.jsx.

// UUID - OrderPage.jsx

UUID passar bra i appen eftersom varje biljett även behöver ett unikt framslumpat ID.

Har använt den genom att applicera ett ID på varje biljett.

Jag importerar "v4" (för slumpad ID-generering) under namnet "uuidv4", från uuid, på OrderPage.jsx. Inom "handleOrder" så anropar jag sedan helt enkelt denna funktion, för framslumpning av ett unikt ID som appliceras enskilt till varje skapad biljett. Med ".slice(0, 5)" så kortar jag även ner antalet tecken från 32 st till 5 st. Voila!
