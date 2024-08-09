import { css, resetCSS, Grimoire } from "../../util/grimoire";

const Sample = {
    main: () => {
        return (
            <html>
                <head>
                    <base href={"../src/books/sample/"} />
                    <style>{resetCSS}</style>
                    <style>
                        {`html {
    counter-set: chapter-number 0 chapter-indicator 0 section-indicator 0 preface-indicator 0 trh-page 0;
}

@page {
    size: letter;
    margin: 0.5in;
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
    background-image: url("./cover.jpg");
    background-position: center center;
    background-size: cover;
}

@page preface:left {
    @bottom-left-corner {
        content: counter(trh-page, lower-roman);
        border-right: 1px solid #444;
        margin: 4pt;
    }
    @left-top {
        content: string(preface-title);
        color: #444;
        border-right: 1px solid #444;
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
        content: counter(preface-indicator, upper-latin);
        text-align: center;
        vertical-align: middle;
        background: #aaa;
        color: black;
        font-size: 16pt;
        margin: 0 4pt 4pt 0;
        padding: 4pt 0 0 4pt;
    }
}

@page preface:right {
    @bottom-right-corner {
        content: counter(trh-page, lower-roman);
        border-left: 1px solid #444;
        margin: 4pt;
    }
    @right-top {
        content: string(preface-title);
        color: #444;
        border-right: 1px solid #444;
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
        content: counter(preface-indicator, upper-latin);
        text-align: center;
        vertical-align: middle;
        background: #aaa;
        color: black;
        font-size: 16pt;
        margin: 0 0 4pt 4pt;
        padding: 4pt 4pt 0 0;
    }
}

@page preface:first {
    @right-top {
        background: none;
        content: none;
        border: none;
    }
    @left-top {
        background: none;
        content: none;
        border: none;
    }
    @top-left-corner {
        background: none;
        content: none;
        border: none;
    }
    @top-right-corner {
        background: none;
        content: none;
        border: none;
    }
}

@page main-init:left {
    @bottom-left-corner {
        content: counter(trh-page);
        border-right: 1px solid #444;
        margin: 4pt;
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
    }
}

@page main:left {
    @bottom-left-corner {
        content: counter(trh-page);
        border-right: 1px solid #444;
        margin: 4pt;
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
    }
}
@page main:right {
    @bottom-right-corner {
        content: counter(trh-page);
        border-left: 1px solid #444;
        margin: 4pt;
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
    }
}

@page main-init:right {
    @bottom-right-corner {
        content: counter(trh-page);
        border-left: 1px solid #444;
        margin: 4pt;
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
    }
}

@page main:first {
    @top-center {
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

@page main-init:first {
    @top-center {
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

@page title {
    background: #ccf;
}

@page postface {
    background: aqua;
}
@page postface:first {
    background: green;
}
`}
                    </style>
                    <style>
                        {`
hgroup {
    page: title;
}
header {
    page: preface;
    break-before: page;
}
main {
    page: main;
    break-before: page;
}
main:first-of-type {
    page: main-init;
    break-before: page;
}
footer {
    page: postface;
    break-before: page;
}

header h2 {
    string-set: preface-title content(text);
    counter-increment: preface-number;
    color: #444;
}

header h2::before {
    content: counter(preface-number, upper-latin) " - ";
}

main h2 {
    string-set: chapter-title content(text);
    counter-increment: chapter-number;
    color: #444;
}

main h2::before {
    content: counter(chapter-number, upper-roman) " - ";
}

h2 {
    text-align: center;
    font-size: 24pt;
    font-variant: small-caps;
}


`}
                    </style>

                    <script src="http://unpkg.com/pagedjs@0.5.0-beta.1/dist/paged.polyfill.min.js"></script>
                    <style data-pagedjs-ignore>
                        {`

                div.pagedjs_page {
                    counter-increment: trh-page 1;
                }

                div.pagedjs_main-init_first_page {
                    counter-set: trh-page 1;
                }

                .pagedjs_sheet:has(main h2) {
                    counter-increment: chapter-indicator;
                    counter-set: section-indicator 0;
                }
                
                .pagedjs_sheet:has(header h2) {
                    counter-increment: preface-indicator;
                }
                .pagedjs_sheet:has(main h2) {
                    counter-increment: chapter-indicator;
                    counter-set: section-indicator 0;
                }
                .pagedjs_sheet:has(main h3) {
                    counter-increment: section-indicator;
                }
                .pagedjs_sheet:has(main h3):has(main h2) {
                    counter-increment: chapter-indicator;
                    counter-set: section-indicator 1;
                }
                
            `}
                    </style>
                    <title>Style Document Test</title>
                </head>
                <body>
                    <hgroup>
                        <h1>Title</h1>
                        <p>Subtitle</p>
                    </hgroup>
                    <header>
                        <h2>Table of Contents</h2>
                        <nav>This will be the TOC</nav>
                    </header>
                    <header>
                        <h2>Table of Figures</h2>
                        <nav>This will be the TOF</nav>
                    </header>
                    <main>
                        <h2>Chapter 1 Title</h2>
                        <Lipsum />
                        <h3>Section 1 Header</h3>
                        <h3>Section 2 Header</h3>
                    </main>
                    <main>
                        <h2>Chapter 2 Title</h2>
                        <h3>Section 1 Header</h3>
                        <h3>Section 2 Header</h3>
                    </main>
                    <footer>
                        <h2>Index</h2>
                        <nav>This will be the index</nav>
                    </footer>
                </body>
            </html>
        );
    },
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

export { Sample };

const Lipsum = () => {
    return (
        <>
            <p>
                Arcu viverra lobortis ad euismod mus montes. Parturient, metus netus himenaeos eleifend natoque vestibulum vitae auctor conubia. Gravida egestas litora class enim in ridiculus fames
                erat in phasellus ornare. Pellentesque, sodales potenti maecenas volutpat! Tempor mi tempor sodales nostra metus penatibus. Morbi est cum mi proin egestas tempor dapibus. Nam curae;
                ullamcorper lectus pellentesque diam nostra metus. Dictumst dignissim integer egestas.
            </p>
            <p>
                Maecenas in dapibus inceptos cum mattis semper montes. Justo luctus augue eleifend diam sapien ultrices parturient nunc curae;. Quis magna luctus torquent molestie primis curabitur id?
                Egestas, malesuada iaculis rutrum ultricies scelerisque etiam. Augue ornare varius aliquet. Cum penatibus consectetur lacus potenti. Consequat gravida torquent blandit neque neque
                potenti, mollis rhoncus tincidunt nibh non faucibus. Donec dignissim, vel pretium. Augue enim nullam metus, odio curae; himenaeos. Quis litora.
            </p>
            <p>
                Hac penatibus ante risus sagittis eget fringilla elementum condimentum pellentesque quam convallis. Neque orci pharetra curabitur ornare posuere malesuada dapibus. Volutpat phasellus
                sociis nam lobortis dictumst a? Elementum nisi in facilisi integer dictumst litora. Purus augue tincidunt fringilla. Magnis nulla dictum phasellus sapien sed diam scelerisque vivamus
                elementum nisi. Eget erat quisque varius mi. Viverra auctor in lectus himenaeos eu per dui ut nulla nunc integer neque! Mattis aptent blandit cursus? Habitasse nec a a cubilia odio
                vulputate commodo consequat ridiculus sollicitudin quam vivamus. Ad vivamus praesent nullam fringilla facilisis proin arcu porta facilisi! Ad nascetur.
            </p>
            <p>
                Volutpat maecenas eu dapibus id, nisl arcu? Sem mollis, taciti volutpat consectetur egestas? Ultricies commodo faucibus luctus nascetur. Nisl massa dignissim praesent tristique
                faucibus sociosqu metus. Habitasse nullam nibh volutpat consectetur at praesent scelerisque nibh. Cursus laoreet felis turpis integer libero habitasse tincidunt curabitur sodales
                luctus sollicitudin. Iaculis aptent condimentum sem magna morbi parturient feugiat class torquent duis cubilia adipiscing. Euismod lacinia porttitor ipsum nunc. Nulla netus pulvinar
                velit porta viverra porta magna eget. Tellus commodo id laoreet erat feugiat ullamcorper fringilla feugiat sit sollicitudin dictumst magna. Himenaeos ultrices cubilia sapien cum
                aliquet.
            </p>
            <p>
                Massa dolor quisque imperdiet faucibus venenatis ante sociis ligula, phasellus nisl aliquam convallis. Torquent nullam rutrum quis auctor platea parturient sociosqu mauris venenatis
                ipsum fringilla. Conubia habitant a proin accumsan quisque quam. Platea montes potenti sodales nec congue vivamus aliquam magna vivamus phasellus duis. Blandit torquent himenaeos
                vivamus. Senectus maecenas metus tristique praesent nascetur faucibus adipiscing odio amet ultricies lectus. Mus eu dolor, platea donec nisl tempus blandit class vitae eu. Ultrices
                euismod aliquet vehicula. Euismod, sem lobortis aptent magna.
            </p>
            <p>
                Ornare aenean vivamus habitant magna! Montes felis nunc morbi dictumst fusce nulla. Sollicitudin luctus vivamus erat sed leo senectus nostra dignissim aenean per eleifend cubilia. Sed
                porttitor, parturient fames pellentesque dis hac venenatis pellentesque himenaeos cursus. Auctor condimentum nibh consequat. Consectetur velit nulla at ultrices? Facilisis dictum
                viverra sed magnis porta scelerisque iaculis himenaeos ante ligula tempor suspendisse.
            </p>
            <p>
                Mauris semper magna sem vestibulum. Habitasse sociis laoreet felis tempus fringilla neque parturient sollicitudin eget fermentum auctor. Eu arcu pellentesque magnis hendrerit magnis at
                lobortis tellus? Fusce purus blandit ipsum sem ornare fames sed. Rhoncus vulputate diam neque pulvinar eget dictum tellus feugiat ultricies penatibus ad. Vehicula, consequat praesent
                suscipit magna sem litora.
            </p>
            <p>
                Rutrum dis aliquet ipsum tellus. Bibendum nulla ante, mattis magna maecenas ullamcorper dui egestas duis. Curae; facilisi dolor quam! Vel ac sociosqu parturient class morbi odio augue
                parturient senectus. Augue in torquent sodales quam laoreet praesent aenean molestie facilisis platea. Eros ornare ac quam odio blandit cras eu elementum praesent. Iaculis habitasse
                urna placerat montes et metus libero. Tempor feugiat ligula iaculis ut elit mi. Odio massa nisi nulla taciti libero consectetur interdum montes! Lobortis commodo convallis sollicitudin
                eros potenti hendrerit tellus gravida. Dolor vel himenaeos volutpat ut ac pellentesque proin primis eu lorem. A, tristique.
            </p>
            <p>
                Ipsum primis facilisi commodo suscipit laoreet. Penatibus pretium ligula amet vulputate taciti taciti natoque. Auctor congue purus tincidunt tellus eget sed? Sapien ridiculus vulputate
                iaculis semper mus pulvinar dolor viverra eros eros platea quisque. Elit; id elit dignissim diam senectus vulputate. Malesuada porta curabitur ac elit magna mattis. Odio et ultricies,
                nisi sagittis ipsum sit! Ipsum, in dictumst a.
            </p>
            <p>
                Lacus suscipit velit lacinia. Velit, sociosqu curae; euismod felis. Fusce magna erat nascetur cubilia aliquam ut. Mattis eros ornare natoque curabitur ante, sapien montes rutrum.
                Habitasse taciti viverra orci leo, a interdum taciti viverra fames. Ridiculus nostra massa feugiat tempus. Quam conubia viverra quam turpis maecenas eget lacinia porta. Nisi
                condimentum ullamcorper class semper. Lacus condimentum cras nec ut non pretium bibendum quam cras lectus. Egestas odio integer magnis proin arcu nullam nunc justo cursus. Molestie
                urna cras penatibus quis odio lacinia pharetra. Tristique elementum eget curae; at congue? Nibh.
            </p>
            <p>
                Facilisis id libero dictum mi commodo. Nisi porttitor non et. Curabitur egestas viverra sollicitudin aliquet posuere. Luctus quis nam iaculis taciti velit cras posuere suscipit quis
                facilisi semper? Nisi vulputate suscipit egestas luctus libero, condimentum pharetra enim lorem urna dignissim. Amet sed, taciti sem taciti aliquam aliquam vestibulum euismod nisl
                laoreet mi elementum. Amet cum netus quam parturient ultricies fames. Nascetur, fermentum lacinia fringilla donec praesent! Odio iaculis nibh elementum ipsum potenti cursus netus
                ultricies mattis, posuere pellentesque vulputate. Laoreet euismod vivamus maecenas dapibus odio accumsan aliquam duis porttitor praesent sit. Integer nullam fusce mi.
            </p>
            <p>
                Ridiculus curae; pharetra nam volutpat, per vitae cras. Curae; facilisi platea, purus proin integer tortor sem cras molestie nullam. Tempus quisque tempor vulputate eu a habitant
                tristique! Phasellus, praesent at sit sit dictumst odio. Fames dapibus id leo, neque id posuere etiam arcu turpis. Dui faucibus nam sodales. Adipiscing luctus dapibus litora dictumst.
            </p>
            <p>
                Tellus nascetur urna tempor vulputate praesent sapien vivamus! Amet in leo viverra nascetur potenti posuere primis. Platea phasellus vehicula aliquet placerat praesent fusce duis erat
                sollicitudin cum aenean lorem! Ipsum risus gravida lobortis conubia lorem! Donec; hac habitasse ridiculus pulvinar ipsum metus maecenas pharetra et enim primis. Egestas dolor sit
                cubilia, mi neque? Pellentesque tempor orci in. Morbi fames eros porta bibendum a fringilla iaculis! Dis augue fermentum etiam turpis urna consequat justo dignissim convallis imperdiet
                mollis.
            </p>
            <p>
                Elementum congue est habitant hendrerit luctus tellus placerat ut. Felis adipiscing euismod sem lorem cursus interdum. Dolor, sociis risus egestas eu integer adipiscing. Fermentum
                lorem nam himenaeos accumsan congue. Scelerisque rutrum metus, pretium erat commodo. Sed vitae aliquam, accumsan sed suspendisse libero sociis dictum nec massa cum. Eu lorem cubilia
                consequat sapien dolor massa inceptos litora phasellus. Quis maecenas lectus ipsum orci nostra adipiscing; urna scelerisque. Feugiat ac libero, vulputate phasellus faucibus. Fringilla.
            </p>
            <p>
                Eget non tempus massa nascetur tempor conubia mattis netus. Velit accumsan donec fringilla dictumst rutrum nec tempor eleifend? Cursus fringilla hac turpis penatibus sociis odio. Ac
                massa eleifend est mollis feugiat torquent ipsum phasellus. Litora dis fringilla facilisi. Lobortis tempus hendrerit suspendisse porta rutrum nam magnis ut ridiculus a! Vivamus nibh
                fringilla, justo suspendisse tempus. Nisl integer viverra aliquet habitant at curabitur? Suscipit tempor.
            </p>
            <p>
                Fames donec cubilia porttitor posuere id ligula mattis? Varius per congue arcu suspendisse himenaeos platea venenatis eu euismod varius. At dis varius faucibus viverra. Per feugiat ad
                dui rhoncus odio massa quisque dapibus etiam ullamcorper. Sapien quis nisl convallis placerat conubia primis dapibus sapien, natoque primis faucibus purus? Ultricies volutpat
                scelerisque nibh enim? Tempus quis purus curae; sem platea accumsan ad. Rhoncus justo libero aliquam porta curae; lacus. Orci pharetra dignissim netus quis. Luctus dignissim eget
                pellentesque ante torquent sapien lorem sagittis commodo velit litora. Nibh varius massa eleifend nam. Fermentum erat elementum tortor mus cubilia.
            </p>
            <p>
                Risus inceptos dolor consequat etiam sagittis viverra amet vehicula sollicitudin quisque. In arcu primis sociis ad curabitur varius cursus posuere bibendum enim magnis litora. Taciti
                congue dictumst consectetur porta fames et tellus proin aenean! Lectus porta fames facilisis senectus vehicula auctor, eu urna potenti duis cubilia pellentesque. Iaculis tellus ac
                ipsum conubia turpis curae; neque dolor habitant tortor aliquam? Nullam sem vitae donec in cubilia vestibulum himenaeos dignissim cursus arcu ultrices. Aptent gravida et luctus aliquam
                urna donec scelerisque. Imperdiet class et posuere amet curae; mollis in, blandit commodo.
            </p>
            <p>
                Ultricies non urna per mollis aenean inceptos faucibus sollicitudin cubilia ac. Dolor neque maecenas purus egestas litora lacus. Nunc aenean conubia lectus eget vitae dictum ultrices
                dolor malesuada semper habitasse convallis. Nam cras himenaeos imperdiet hendrerit lacus leo. At parturient hac elementum varius varius euismod dictum consectetur platea faucibus.
                Massa curabitur praesent et facilisis ultricies mi parturient vehicula imperdiet facilisi. Fames molestie habitasse phasellus cum feugiat convallis ridiculus.
            </p>
            <p>
                Velit vestibulum montes primis eleifend tristique taciti, faucibus aliquam posuere mollis lacinia. Penatibus justo; sollicitudin ut aenean. Mus imperdiet risus enim laoreet quam duis
                elementum sociis? Quam natoque imperdiet sodales venenatis facilisis. Venenatis mauris hendrerit nam torquent vehicula neque ridiculus porttitor euismod quisque feugiat porta!
                Adipiscing lectus, facilisis condimentum vestibulum nam sollicitudin mattis sociosqu nisl ante conubia pellentesque. Auctor nostra litora nisl elit mollis cras egestas risus sagittis
                volutpat litora tellus! Fermentum faucibus tellus massa luctus mattis elementum auctor blandit nam! Urna integer curabitur facilisis odio ut per vestibulum.
            </p>
            <p>
                Porttitor, praesent mi metus dictumst himenaeos. Metus parturient adipiscing duis placerat sapien habitasse purus magnis egestas. Potenti nulla mattis libero fringilla amet. Dis
                natoque tempor mus blandit, adipiscing ipsum interdum! Donec dui nullam vivamus nullam ut gravida consequat molestie at? Amet hendrerit potenti dapibus praesent dolor litora? Dictum,
                et hac natoque. Ullamcorper urna in ornare primis a rhoncus sodales erat himenaeos cubilia platea lorem? Inceptos id aenean, eget morbi. Mattis mollis euismod nostra ac auctor donec
                elementum aptent.
            </p>
        </>
    );
};
