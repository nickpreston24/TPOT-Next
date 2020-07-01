import * as React from 'react';
import { theme } from "@chakra-ui/core";


export default {
    icons: {
        // Add Chakra's icons
        ...theme.icons,
        // Your custom icons
        ribbon: {
            path: (
                <>
                    <path fill="currentColor" d="M3.95,13.908L0.125,21.5l5.434-1.358L8,24l2.94-6.058C8.074,17.639,5.575,16.115,3.95,13.908 z" />
                    <path fill="currentColor" d="M20.05,13.908l3.825,7.592l-5.434-1.358L16,24l-2.94-6.058 C15.926,17.639,18.425,16.115,20.05,13.908z" />
                    <path fill="currentColor" d="M12,0C7.589,0,4,3.589,4,8s3.589,8,8,8s8-3.589,8-8S16.411,0,12,0z M12,10c-1.105,0-2-0.895-2-2 c0-1.105,0.895-2,2-2s2,0.895,2,2C14,9.105,13.105,10,12,10z" />
                </>
            ),
            viewBox: "0 0 24 24",
        },
        scribe: {
            path: (
                <path fill="currentColor" d="M3.3 13.5c-.2 2-.3 3.9-.3 5.9L.3 22.1c-.4.4-.4 1.2 0 1.6.4.4 1.2.4 1.6 0L4.6 21c2 0 4-.1 5.9-.3C22.2 19.5 23.8 2.4 24 0 21.6.2 4.5 1.8 3.3 13.5zm7 4.9l-3.3.3 2.2-2.2H15c-1.3 1-2.9 1.7-4.7 1.9zm6.2-3.4h-5.9l3-3h5c-.6 1.1-1.3 2.1-2.1 3zm-1.4-4.5l.6-.6c.4-.4.4-1.2 0-1.6-.4-.4-1.2-.4-1.6 0l-8.8 8.8c.1-1.1.1-2.3.3-3.4.8-7.9 10.8-10.4 15.8-11.1-.3 2.1-1 5.1-2.2 7.9h-4.1z" />
            ),
            viewBox: "0 0 24 24",
        },
        settings: {
            path: (
                <g stroke-linecap="round" stroke-linejoin="round" stroke-width="2" fill="currentColor" stroke="currentColor">
                    <path fill="none" stroke="currentColor" stroke-miterlimit="10" d="M23,14v-4h-3.262 c-0.189-0.732-0.477-1.422-0.852-2.058l2.306-2.306l-2.828-2.828l-2.306,2.306C15.422,4.739,14.732,4.451,14,4.262V1h-4v3.262 C9.268,4.451,8.578,4.739,7.942,5.114L5.636,2.808L2.808,5.636l2.306,2.306C4.739,8.578,4.451,9.268,4.262,10H1v4h3.262 c0.189,0.732,0.477,1.422,0.852,2.058l-2.306,2.306l2.828,2.828l2.306-2.306c0.635,0.375,1.326,0.663,2.058,0.852V23h4v-3.262 c0.732-0.189,1.422-0.477,2.058-0.852l2.306,2.306l2.828-2.828l-2.306-2.306c0.375-0.635,0.663-1.326,0.852-2.058H23z" />
                    <circle fill="none" stroke-miterlimit="10" cx="12" cy="12" r="3" />
                </g>
            ),
            viewBox: "0 0 24 24",
        },
        logout: {
            path: (
                <g fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
                    <path d="M21,12V5H3 C1.895,5,1,4.105,1,3v17c0,1.657,1.343,3,3,3h17v-7" fill="none" stroke="currentColor"/>
                    <path d="M17,2V1H3 C1.895,1,1,1.895,1,3v0c0,1.105,0.895,2,2,2" fill="none" stroke="currentColor"/>
                    <path d="M23,16h-5 c-1.105,0-2-0.895-2-2l0,0c0-1.105,0.895-2,2-2h5V16z" fill="none"/>
                </g>
            ),
            viewBox: "0 0 24 24",
        }
    }
}

