import React, {PropsWithChildren} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "react-uikit/tabs";

const CodeTabs = ({children}:PropsWithChildren) => {
    return (
        <Tabs defaultValue="html">
            <TabsList>
                <TabsTrigger value="html">Html</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
            </TabsList>
            {children}
        </Tabs>
    );
};

export default CodeTabs;