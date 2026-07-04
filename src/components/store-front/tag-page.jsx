import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
const TagPage = ({ store, tag, }) => {
    const { template } = store;
    const TagsPage = dynamic(() => import(`../templates/${template}/tag-page`), {
        loading: () => <Loader />,
    });
    if (!TagsPage) {
        return <div>Template not found</div>;
    }
    return <TagsPage store={store} tag={tag}/>;
};
export default TagPage;
