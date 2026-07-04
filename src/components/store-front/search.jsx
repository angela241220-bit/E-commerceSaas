import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
const Search = ({ store }) => {
    const { template } = store;
    const SearchPage = dynamic(() => import(`../templates/${template}/search`), {
        loading: () => <Loader />,
    });
    if (!SearchPage) {
        return <div>Template not found</div>;
    }
    return <SearchPage store={store}/>;
};
export default Search;
