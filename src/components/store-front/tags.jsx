import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
const Tags = ({ store }) => {
    const { template } = store;
    const TagsPage = dynamic(() => import(`../templates/${template}/tags`), {
        loading: () => <Loader />,
    });
    if (!TagsPage) {
        return <div>Template not found</div>;
    }
    return <TagsPage store={store}/>;
};
export default Tags;
