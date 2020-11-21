// export function getAnchorURLs(papers: any[] = []) {

//     if (!papers || papers.length == 0)
//         return [];

//     console.log('papers', papers)
//     let anchors = []
//     papers.reduce((_, nextPaper) => {
//         const html = nextPaper?.content?.rendered || ''
//         anchors.push(getAnchorURLs(html))
//     }, anchors);
//     return anchors;
// }

export function getAnchors(html = null) {
    if (!html) return []
    var regex = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;
    let link;
    let links = [];

    while ((link = regex.exec(html)) !== null) {
        links.push(link[2]);
    }

    return links
}