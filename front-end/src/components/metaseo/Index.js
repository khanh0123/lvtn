import React from 'react';
import SEO from "./Seo";
import config from "../../config";


let CreateHelmetTag = ({ page, data, url, episodeId }) => {
    switch (page) {
        case 'home':

            return (
                <SEO
                    title={config.seo_default.title}
                    description={config.seo_default.description}
                    url={url ? url : '/'}
                />
            )
        case 'info':
            return (
                <SEO
                    title={data.name ? data.name : config.seo_default.title}
                    description={data.long_des ? data.long_des : config.seo_default.description}
                    url={url ? url : '/'}
                    contentType="article"
                    img={data.image ? data.image : ''}

                />
            )
        case 'detail':
            return (
                <SEO
                    title={data.name ? data.name : config.seo_default.title}
                    description={data.long_des ? data.long_des : config.seo_default.description}
                    url={url ? url : '/'}
                    contentType="article"
                    img={data.image ? data.image : ''}

                />
            )
        case 'filter':
            let title = config.title.webtitle;
            if(data.tags){
                 
                data.tags.map((tag) => {
                    title += (" - "+ tag.name)
                })
            } else {
                title = config.seo_default.title;
            }
            return (
                <SEO
                    title={title}
                    description={config.seo_default.description}
                    url={url ? url : '/'}
                    contentType="movie"

                />
            )

        default:
            return (
                <SEO
                    title={config.seo_default.title}
                    description={config.seo_default.description}
                    path="/"
                />
            )
    }

}
export default CreateHelmetTag;