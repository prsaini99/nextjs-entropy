import React from 'react'

const logos = [
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c98_Logos%20Grid%2002.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce7_Logos04.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c97_Logos%20Grid%2007.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce5_Logos01.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c8f_Logos%20Grid%2003.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c96_Logos%20Grid%2009.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c95_Logos%20Grid%2006.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce6_Logos03.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c94_Logos%20Grid%2010.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce4_Logos02.svg', },
];

export default function TrustedByAbout() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="trusted-by-about-component">
                        <div data-w-id="ae73a4fa-4647-403b-a6f8-ac6ec692aaf4" className="opacity-60">
                            <div className="text-size-small">Trusted by design teams at</div>
                        </div>
                        <div className="trusted-by-about-logos logos">
                            {logos.map((logo, index) => (
                                <div key={index} className="flex justify-center items-center">
                                    <img loading="lazy" src={logo.src} alt="Logo" className='w-11/12 h-5/6' />
                                </div>
                            ))}
                            {/* <div id="w-node-ae73a4fa-4647-403b-a6f8-ac6ec692aafa-aee64c2d"
                                data-w-id="ae73a4fa-4647-403b-a6f8-ac6ec692aafa" className="logos">
                                <img
                                    loading="lazy"
                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce7_Logos04.svg"
                                    alt="Logos" /></div>
                            <div id="w-node-ae73a4fa-4647-403b-a6f8-ac6ec692aafc-aee64c2d"
                                data-w-id="ae73a4fa-4647-403b-a6f8-ac6ec692aafc" className="logos">
                                <img
                                    loading="lazy"
                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c97_Logos%20Grid%2007.svg"
                                    alt="Logo" /></div>
                            <div id="w-node-ae73a4fa-4647-403b-a6f8-ac6ec692aafe-aee64c2d"
                                data-w-id="ae73a4fa-4647-403b-a6f8-ac6ec692aafe" className="logos">
                                <img
                                    loading="lazy"
                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce5_Logos01.svg"
                                    alt="Logos" /></div>
                            <div id="w-node-ae73a4fa-4647-403b-a6f8-ac6ec692ab00-aee64c2d"
                                data-w-id="ae73a4fa-4647-403b-a6f8-ac6ec692ab00" className="logos">
                                <img
                                    loading="lazy"
                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c8f_Logos%20Grid%2003.svg"
                                    alt="Logo" /></div>
                            <div id="w-node-ae73a4fa-4647-403b-a6f8-ac6ec692ab02-aee64c2d"
                                data-w-id="ae73a4fa-4647-403b-a6f8-ac6ec692ab02" className="logos">
                                <img
                                    loading="lazy"
                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c96_Logos%20Grid%2009.svg"
                                    alt="Logo" /></div>
                            <div id="w-node-ae73a4fa-4647-403b-a6f8-ac6ec692ab04-aee64c2d"
                                data-w-id="ae73a4fa-4647-403b-a6f8-ac6ec692ab04" className="logos">
                                <img
                                    loading="lazy"
                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c95_Logos%20Grid%2006.svg"
                                    alt="Logo" /></div>
                            <div id="w-node-ae73a4fa-4647-403b-a6f8-ac6ec692ab06-aee64c2d"
                                data-w-id="ae73a4fa-4647-403b-a6f8-ac6ec692ab06" className="logos">
                                <img
                                    loading="lazy"
                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce6_Logos03.svg"
                                    alt="Logos" /></div>
                            <div id="w-node-ae73a4fa-4647-403b-a6f8-ac6ec692ab08-aee64c2d"
                                data-w-id="ae73a4fa-4647-403b-a6f8-ac6ec692ab08" className="logos">
                                <img
                                    loading="lazy"
                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c94_Logos%20Grid%2010.svg"
                                    alt="Logo" /></div>
                            <div id="w-node-ae73a4fa-4647-403b-a6f8-ac6ec692ab0a-aee64c2d"
                                data-w-id="ae73a4fa-4647-403b-a6f8-ac6ec692ab0a" className="logos">
                                <img
                                    loading="lazy"
                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce4_Logos02.svg"
                                    alt="Logos" /></div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

