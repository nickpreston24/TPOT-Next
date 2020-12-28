import Router from 'next/router';

export default (context: any, target: string) => {

    const isServer = context.res || context.req;

    // If using SSR:
    if (isServer) {
        context.res.writeHead(303, { Location: target });
        context.res.end();
    }
    // Default to browser:
    else {
        Router.replace(target)
    }
}