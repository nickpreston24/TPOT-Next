import { Heading, List } from '@chakra-ui/core';
import { Paper } from 'models';
import { FC } from 'react';
import { Find } from 'models/domain';
import { ListProps } from "./ListProps";
/** wpapi can only get 'published' papers from WP, hence the list
 * Could make a card from this later (like the airbnb card)
 */
export const PublishedPapers: FC<ListProps<Paper>> = ({ entries: papers, title }) => {

    let titles = papers.map(p => Find(p, "title").rendered); // Hack to assign rendered to `title`.  TODO: add the With/Alter functionality to the `toDto()` as an optional param.


    // console.log('titles :>> ', titles)
    return (<List>
        {title && <Heading size="md">{title}</Heading>}


        {papers.map((paper, index) => {
            const { id, title, url, slug } = paper;
            // console.log('title :>> ', title);
            return (
                <div key={index}>
                    <h2><b>{titles[index]}</b>


                    </h2>
                </div>
            );
        })}
    </List>);
};
