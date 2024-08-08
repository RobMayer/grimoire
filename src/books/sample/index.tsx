import { css, resetCSS, Grimoire } from "../../util/grimoire";

export const Sample = {
    main: (
        <html>
            <head>
                <style>{resetCSS}</style>
                <style>{`
                body {
                    font-family: "Trebuchet MS";
                    font-size: 11pt;
                }


                @page {
                    size: letter;
                    margin: 0;
                    @bottom-left-corner {
                        text-align: center;
                        vertical-align: middle;
                    }
                    @bottom-right-corner {
                        text-align: center;
                        vertical-align: middle;
                    }
                }

                @page title {
                    size: letter;
                    margin: 0;
                    background-image: url("../src/books/sample/img/cover.jpg");
                    background-position: center center;
                    background-size: cover;
                }

                @page main {
                    margin: 0.5in;
                    @top-center {
                        content: none;
                    }
                }

                @page main:left {
                    @bottom-left-corner {
                        content: counter(page);
                    }
                    @left-top {
                        content: string(chapter-title);
                        color: #048;
                        border-right: 1px solid #048;
                        white-space: nowrap;
                        text-orientation: mixed;
                        writing-mode: vertical-rl;
                        place-content: center start;
                        display: grid;
                        block-size: fit-content;
                        justify-self: center;
                        align-self: start;
                        padding-block: 0.25em;
                        padding-inline: 0.5em 3em;
                        margin-inline: -4pt 0;
                        font-size: 16pt;
                        font-variant: small-caps;
                    }
                    @top-left-corner {
                        content: counter(chapter-indicator, upper-roman);
                        text-align: center;
                        vertical-align: middle;
                        background: #048;
                        color: white;
                        font-size: 16pt;
                        margin: 0 4pt 4pt 0;
                    }
                    @bottom-left {
                        content: counter(chapter-indicator, upper-roman) "." counter(section-indicator) " - " string(section-title, first);
                        vertical-align: middle;
                        padding-left: 4pt;
                        margin-block: 4pt;
                        border-left: 1px solid #444;
                    }
                }
                @page main:right {
                    @bottom-right-corner {
                        content: counter(page);
                    }
                    @right-top {
                        content: string(chapter-title);
                        color: #048;
                        border-right: 1px solid #048;
                        rotate: 180deg;
                        white-space: nowrap;
                        text-orientation: mixed;
                        writing-mode: vertical-rl;
                        place-content: center start;
                        display: grid;
                        block-size: fit-content;
                        justify-self: center;
                        align-self: start;
                        padding-block: 0.25em;
                        padding-inline: 3em 0.5em;
                        font-size: 16pt;
                        font-variant: small-caps;
                        margin-inline: -4pt 0;
                    }
                    @top-right-corner {
                        content: counter(chapter-indicator, upper-roman);
                        text-align: center;
                        vertical-align: middle;
                        background: #048;
                        color: white;
                        font-size: 16pt;
                        margin: 0 0 4pt 4pt;
                    }
                    @bottom-right {
                        content: counter(chapter-indicator, upper-roman) "." counter(section-indicator) " - " string(section-title, first);
                        vertical-align: middle;
                        padding-right: 4pt;
                        margin-block: 4pt;
                        border-right: 1px solid #444;
                    }
                }

                @page main:first {
                    @top-center {
                        content: "Main First";
                    }
                    @left-top {
                        border: none;
                        content: none;
                        background: none;
                    }
                    @right-top {
                        border: none;
                        content: none;
                        background: none;
                    }
                    @top-right-corner {
                        border: none;
                        content: none;
                        background: none;
                    }
                    @top-left-corner {
                        border: none;
                        content: none;
                        background: none;
                    }
                }

                hgroup {
                    page: title;
                    display: grid;
                    height: 100%;
                    place-items: space-around center;
                    align-text: center;
                    place-content: space-around center;
                    color: white;
                    font-variant: small-caps;
                    h1 {
                        font-size: 48pt;
                    }
                    p {
                        font-size: 24pt;
                    }
                }

                html {
                    counter-set: chapter-number 0 chapter-indicator 0 section-indicator 0;
                }

                main {
                    page: main;
                    break-before: page;
                }

                main h2 {
                    counter-increment: chapter-number;
                    string-set: chapter-title content(text);

                    color: #048;
                    font-size: 24pt;
                }
                
                main > h2::before {
                    content: counter(chapter-number, upper-roman) " - ";
                }
                    
                main h3 {
                    counter-increment: section-number;
                }

                main h2, main h3 {
                    string-set: section-title content(text);
                }

                main h3::before {
                    content: counter(chapter-number, upper-roman) "." counter(section-number, decimal) " - ";
                }

                main:first-of-type {
                    counter-reset: page 1;
                }

                @media pagedjs-ignore {
                    .pagedjs_sheet:has(main > h2) {
                        counter-increment: chapter-indicator;
                        counter-set: section-indicator 0;
                    }
                    .pagedjs_sheet:has(section > h3) {
                        counter-increment: section-indicator;
                    }
                    .pagedjs_sheet:has(section > h3):has(main > h2) {
                        counter-increment: chapter-indicator;
                        counter-set: section-indicator 1;
                    }
                }

            `}</style>
                <style data-pagedjs-ignore>
                    {`
                    .pagedjs_sheet:has(main > h2) {
                        counter-increment: chapter-indicator;
                        counter-set: section-indicator 0;
                    }
                    .pagedjs_sheet:has(section > h3) {
                        counter-increment: section-indicator;
                    }
                    .pagedjs_sheet:has(section > h3):has(main > h2) {
                        counter-increment: chapter-indicator;
                        counter-set: section-indicator 1;
                    }
                `}
                </style>
                <base href={"../src/books/sample/"} />
                <title>Style Document Test</title>
                
            </head>
            <body data-test="test">
                <hgroup>
                    <h1>Title</h1>
                    <p>Subtitle</p>
                </hgroup>
                <nav></nav>
                <main>
                    <h2>First Chapter</h2>
                    <p>
                        All right, then. Keep your secrets. Hasty brandy nature corrupt ahead Legolas warrior spawn cook rebuild warm. Gotta alive coneys insect Dwarf-lords ignoring hole bestow
                        riverbank. Pie learn parted slunk domains grace runt aye crevice moving he Helm's Deep.
                    </p>
                    <p>Thror's splendid lowly. Filleting Éowyn whoa! Beautiful twittering Lindir committees impassable nervous pursuit honorably. Nobody tosses a Dwarf.</p>
                    <p>
                        You are full of surprises, Master Baggins. None belief opened Galion? Bits blimey legion belongs listened forced favor Smaug legend creature. Galeton useless trusted elevenses.
                    </p>

                    <ul>
                        <li>Meduseld!</li>
                        <li>Bert!</li>
                        <li>Smaug?</li>
                        <li>Myrtle.</li>
                        <li>Girion.</li>
                    </ul>
                    <ul>
                        <li>Shire fruity text ride midday debt villain.</li> <li>Ate profit east grant rules Dimholt perceived.</li> <li>Seduced Arkenstone bind utter piety pan tubers.</li>
                        <li>Preparing have pain depend pouch Dimholt instilled comes unspoiled.</li> <li>Isildur realm circles adventures announce nesting balanced hall.</li>
                    </ul>
                    <p>
                        Wealth smallest times built deliver physical speaking Erebor no talking dignity tad. Crown resown buy diminish share that'll provisions smithy Helm's Deep keen? Pointy-eared
                        masters winter's avenged whence Edge. A wizard is never late, Frodo Baggins. Nor is he early. He arrives precisely when he means to.
                    </p>
                    <ol>
                        <li>Éowyn.</li> <li>Balrog.</li> <li>Warg?</li> <li>Gondor?</li> <li>Witch-king.</li>
                    </ol>
                    <ol>
                        <li>Galeton tried shh industry shortly he bought loud stink.</li> <li>Best name's halls Bar-hrum behaving.</li>
                        <li>Drawn dungeons dispatch dock leg official starters disease Lower.</li> <li>Brandy bow drown show hours Istari everybody armies?</li>
                        <li>Coaster ringing nowhere horse cares plunder vulnerable Glóin sailed!</li>
                    </ol>
                    <p>
                        Stinks means creature pirate everyday cloaked remade Lindir. Elderly chap. Big grey beard, pointy hat. Grandfather's Isen accorded dominion handle horrid powerless flagon
                        coward bell sawed. Lesser seeking spent Shire's keeper eve decay stores claimed enjoy.
                    </p>
                    <p>
                        All right, then. Keep your secrets. Hasty brandy nature corrupt ahead Legolas warrior spawn cook rebuild warm. Gotta alive coneys insect Dwarf-lords ignoring hole bestow
                        riverbank. Pie learn parted slunk domains grace runt aye crevice moving he Helm's Deep.
                    </p>
                    <p>Thror's splendid lowly. Filleting Éowyn whoa! Beautiful twittering Lindir committees impassable nervous pursuit honorably. Nobody tosses a Dwarf.</p>
                    <p>
                        You are full of surprises, Master Baggins. None belief opened Galion? Bits blimey legion belongs listened forced favor Smaug legend creature. Galeton useless trusted elevenses.
                    </p>
                    <ul>
                        <li>Meduseld!</li>
                        <li>Bert!</li>
                        <li>Smaug?</li>
                        <li>Myrtle.</li>
                        <li>Girion.</li>
                    </ul>
                    <ul>
                        <li>Shire fruity text ride midday debt villain.</li> <li>Ate profit east grant rules Dimholt perceived.</li> <li>Seduced Arkenstone bind utter piety pan tubers.</li>
                        <li>Preparing have pain depend pouch Dimholt instilled comes unspoiled.</li> <li>Isildur realm circles adventures announce nesting balanced hall.</li>
                    </ul>
                    <p>
                        Wealth smallest times built deliver physical speaking Erebor no talking dignity tad. Crown resown buy diminish share that'll provisions smithy Helm's Deep keen? Pointy-eared
                        masters winter's avenged whence Edge. A wizard is never late, Frodo Baggins. Nor is he early. He arrives precisely when he means to.
                    </p>
                    <section>
                        <h3>First Section Title</h3>
                    </section>

                    <ol>
                        <li>Éowyn.</li> <li>Balrog.</li> <li>Warg?</li> <li>Gondor?</li> <li>Witch-king.</li>
                    </ol>
                    <ol>
                        <li>Galeton tried shh industry shortly he bought loud stink.</li> <li>Best name's halls Bar-hrum behaving.</li>
                        <li>Drawn dungeons dispatch dock leg official starters disease Lower.</li> <li>Brandy bow drown show hours Istari everybody armies?</li>
                        <li>Coaster ringing nowhere horse cares plunder vulnerable Glóin sailed!</li>
                    </ol>
                    <p>
                        Stinks means creature pirate everyday cloaked remade Lindir. Elderly chap. Big grey beard, pointy hat. Grandfather's Isen accorded dominion handle horrid powerless flagon
                        coward bell sawed. Lesser seeking spent Shire's keeper eve decay stores claimed enjoy.
                    </p>
                    <p>
                        All right, then. Keep your secrets. Hasty brandy nature corrupt ahead Legolas warrior spawn cook rebuild warm. Gotta alive coneys insect Dwarf-lords ignoring hole bestow
                        riverbank. Pie learn parted slunk domains grace runt aye crevice moving he Helm's Deep.
                    </p>
                    <p>Thror's splendid lowly. Filleting Éowyn whoa! Beautiful twittering Lindir committees impassable nervous pursuit honorably. Nobody tosses a Dwarf.</p>
                    <p>
                        You are full of surprises, Master Baggins. None belief opened Galion? Bits blimey legion belongs listened forced favor Smaug legend creature. Galeton useless trusted elevenses.
                    </p>
                    <ul>
                        <li>Meduseld!</li>
                        <li>Bert!</li>
                        <li>Smaug?</li>
                        <li>Myrtle.</li>
                        <li>Girion.</li>
                    </ul>
                    <ul>
                        <li>Shire fruity text ride midday debt villain.</li> <li>Ate profit east grant rules Dimholt perceived.</li> <li>Seduced Arkenstone bind utter piety pan tubers.</li>
                        <li>Preparing have pain depend pouch Dimholt instilled comes unspoiled.</li> <li>Isildur realm circles adventures announce nesting balanced hall.</li>
                    </ul>
                    <p>
                        Wealth smallest times built deliver physical speaking Erebor no talking dignity tad. Crown resown buy diminish share that'll provisions smithy Helm's Deep keen? Pointy-eared
                        masters winter's avenged whence Edge. A wizard is never late, Frodo Baggins. Nor is he early. He arrives precisely when he means to.
                    </p>
                    <ol>
                        <li>Éowyn.</li> <li>Balrog.</li> <li>Warg?</li> <li>Gondor?</li> <li>Witch-king.</li>
                    </ol>
                    <ol>
                        <li>Galeton tried shh industry shortly he bought loud stink.</li> <li>Best name's halls Bar-hrum behaving.</li>
                        <li>Drawn dungeons dispatch dock leg official starters disease Lower.</li> <li>Brandy bow drown show hours Istari everybody armies?</li>
                        <li>Coaster ringing nowhere horse cares plunder vulnerable Glóin sailed!</li>
                    </ol>
                    <p>
                        Stinks means creature pirate everyday cloaked remade Lindir. Elderly chap. Big grey beard, pointy hat. Grandfather's Isen accorded dominion handle horrid powerless flagon
                        coward bell sawed. Lesser seeking spent Shire's keeper eve decay stores claimed enjoy.
                    </p>
                    <p>
                        All right, then. Keep your secrets. Hasty brandy nature corrupt ahead Legolas warrior spawn cook rebuild warm. Gotta alive coneys insect Dwarf-lords ignoring hole bestow
                        riverbank. Pie learn parted slunk domains grace runt aye crevice moving he Helm's Deep.
                    </p>
                    <p>Thror's splendid lowly. Filleting Éowyn whoa! Beautiful twittering Lindir committees impassable nervous pursuit honorably. Nobody tosses a Dwarf.</p>
                    <p>
                        You are full of surprises, Master Baggins. None belief opened Galion? Bits blimey legion belongs listened forced favor Smaug legend creature. Galeton useless trusted elevenses.
                    </p>
                    <ul>
                        <li>Meduseld!</li>
                        <li>Bert!</li>
                        <li>Smaug?</li>
                        <li>Myrtle.</li>
                        <li>Girion.</li>
                    </ul>
                    <ul>
                        <li>Shire fruity text ride midday debt villain.</li> <li>Ate profit east grant rules Dimholt perceived.</li> <li>Seduced Arkenstone bind utter piety pan tubers.</li>
                        <li>Preparing have pain depend pouch Dimholt instilled comes unspoiled.</li> <li>Isildur realm circles adventures announce nesting balanced hall.</li>
                    </ul>
                    <p>
                        Wealth smallest times built deliver physical speaking Erebor no talking dignity tad. Crown resown buy diminish share that'll provisions smithy Helm's Deep keen? Pointy-eared
                        masters winter's avenged whence Edge. A wizard is never late, Frodo Baggins. Nor is he early. He arrives precisely when he means to.
                    </p>
                    <ol>
                        <li>Éowyn.</li> <li>Balrog.</li> <li>Warg?</li> <li>Gondor?</li> <li>Witch-king.</li>
                    </ol>
                    <section>
                        <h3>Second Section Title</h3>
                    </section>
                    <ol>
                        <li>Galeton tried shh industry shortly he bought loud stink.</li> <li>Best name's halls Bar-hrum behaving.</li>
                        <li>Drawn dungeons dispatch dock leg official starters disease Lower.</li> <li>Brandy bow drown show hours Istari everybody armies?</li>
                        <li>Coaster ringing nowhere horse cares plunder vulnerable Glóin sailed!</li>
                    </ol>
                    <p>
                        Stinks means creature pirate everyday cloaked remade Lindir. Elderly chap. Big grey beard, pointy hat. Grandfather's Isen accorded dominion handle horrid powerless flagon
                        coward bell sawed. Lesser seeking spent Shire's keeper eve decay stores claimed enjoy.
                    </p>
                </main>
                <main>
                    <h2>Chapter 2 Title</h2>
                    <figure>
                        <figcaption>Test Table</figcaption>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Lifetime</th>
                                <th>Uncle</th>
                                <th>Faint</th>
                                <th>Filled</th>
                                <th>Play</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Waiting</td>
                                <td>caves</td>
                                <td>fading</td>
                                <td>eyes</td>
                                <td>storm</td>
                                <td>promises</td>
                            </tr>

                            <tr>
                                <td>Fooled</td>
                                <td>corrupt</td>
                                <td>stubbornness</td>
                                <td>dissuade</td>
                                <td>raised</td>
                                <td>smile</td>
                            </tr>

                            <tr>
                                <td>Waters</td>
                                <td>wriggles</td>
                                <td>herbs</td>
                                <td>heir</td>
                                <td>s</td>
                                <td>enchantment</td>
                            </tr>

                            <tr>
                                <td>Fortress</td>
                                <td>brew</td>
                                <td>deadliest</td>
                                <td>risked</td>
                                <td>goat</td>
                                <td>language</td>
                            </tr>

                            <tr>
                                <td>Contract</td>
                                <td>happy</td>
                                <td>hero</td>
                                <td>forfeit</td>
                                <td>tongues</td>
                                <td>alas</td>
                            </tr>

                            <tr>
                                <td>Gallop</td>
                                <td>stock</td>
                                <td>answered</td>
                                <td>troubles</td>
                                <td>four</td>
                                <td>skill</td>
                            </tr>
                        </tbody>

                        <tfoot>
                            <tr>
                                <td>homeland</td>
                                <td>westward</td>
                                <td>wrung</td>
                                <td>rot</td>
                                <td>splendor</td>
                                <td>cruel</td>
                            </tr>
                        </tfoot>
                    </table>
                    </figure>
                    <h4>Apple nearly successful promises no lady Thranduil.</h4>
                    <p>
                        Tomato dissuade wound girl plenty regretted barricade Hobbit's ai-'d. Evacuate bolted eye raven remove haven't feels encampment gather Anduin box. Don't you leave him, Samwise
                        Gamgee.
                    </p>
                    <blockquote>
                        <p>It must be taken deep into Mordor and cast back into the fiery chasm from whence it came.</p>
                        <footer>
                            —Bert, <cite>skin-changer imagine lifted crowns</cite>
                        </footer>
                    </blockquote>
                    <h5>Devouring whereabouts Azog vines telling we gut.</h5>
                    <p>Let the Ring-bearer decide. Myrtle mistaken being scale? Dunharrow none sets rats.</p>
                    <pre>Aged visitors villages Air. Column smell chiefest Sit. Morninged sordid life Bagginses. Labeled pledge 16 Air undone crownless.</pre>
                    <h6>Deposit stench wielder play oaths Freda.</h6>
                    <p>
                        Seduced Mirkwood interesting recoil <code>lament rockets</code>? <kbd>P</kbd> 20 Bolgers held show. Magnificence business wonder Sauron <time>warriors</time>! Fists Earendil
                        speech <strong>succumb rode descendant</strong> offered? Waiting <sub>stove</sub> Rhudaur minutes silverware stabbed. <em>Yet</em> gotta hooks though Strider vast? Triumph
                        hands despair <abbr>Argonath</abbr>. <var>Ill</var> succumb Anárion lead sets accursed. Archer Think <mark>wielding oaken</mark> breach. Tracked grateful{" "}
                        <dfn>Kingsfoil Entwives Southfarthing</dfn> pouring. Pip strengths aloft maps crawled <samp>stood starving forsaken wee</samp>. Written utterly spilt <sup>Lembas</sup> princess
                        crops. Perfect pity stole <cite>waiting careful</cite> Shire's? Deluge clothes bosun's valor <small>Erebor Arod Shire's Rohan</small> reads? Ours cannot plunge{" "}
                        <ins>void attention avoid hunting</ins> riding Númenor. Die three tingle <a>Kili Mithril Shire-folk</a> dust gardeners? Torment Durin's <q>commander money ugly</q> wriggling.
                        Showed Peregrin <del>souls named homage</del> remembrance!
                    </p>
                    <hr />
                    <dl>
                        <dt>Twilight</dt> <dd>Pig bare crown hoped saying everywhere Shire it's strike.</dd> <dt>Making</dt> <dd>Court air each meet boots judged Greenwood sway astray working!</dd>
                        <dd>Treachery knowledge notion rubble bid Ungol laugh to.</dd> <dt>Kindness</dt> <dd>Fellowship poisonous round tricks wisest lands remuneration insult.</dd>
                        <dd>Tempt skulking forfeit famished deserve stole Hobbit rain yesterday.</dd> <dd>Bloom guard dirty sorrow magnificence marches Arwen Evenstar trod presses?</dd>
                    </dl>
                </main>
            </body>
        </html>
    ),
    footer: (
        <>
            <style>{`* {
                box-sizing: border-box;
            }`}</style>

            <footer>
                {css`
                    font-family: "Trebuchet MS";
                    font-size: 11pt;
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    margin-inline: 0.25in;
                    width: 100%;
                    padding: 2pt;
                    align-items: center;
                    border-top: 1px solid #666;
                    color: var(--test);
                    & .title {
                        justify-self: start;
                    }
                    & .pageNumber {
                        justify-self: center;
                    }
                    & .author {
                        justify-self: end;
                    }
                `}
                <span className={"title"} />
                <span className={"pageNumber"} />
                <span className={"author"}>ThatRobHuman</span>
            </footer>
        </>
    ),
    header: <div />,
};
