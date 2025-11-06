import React from 'react';

// Using VS Code Dark+ theme colors
const colors = {
    background: '#1E1E1E',
    comment: '#6A9955',
    foreground: '#D4D4D4',
    keyword: '#569CD6', // const, if, return
    type: '#4EC9B0',
    function: '#DCDCAA', // function names
    variable: '#9CDCFE', // variables
    string: '#CE9178',
    purple: '#C586C0', // import, from
};

const CodeLine: React.FC<{ lineNumber: number; children: React.ReactNode }> = ({ lineNumber, children }) => (
    <div className="flex">
        <span className="text-gray-500 select-none pr-4 w-8 shrink-0 text-right">{lineNumber}</span>
        <span className="flex-1">{children}</span>
    </div>
);

export const CodeBlock: React.FC = () => {
    return (
        <div style={{ backgroundColor: colors.background, color: colors.foreground }} className="rounded-lg overflow-hidden shadow-lg">
            <div className="flex items-center px-4 py-2 bg-gray-900/30">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <pre className="p-4 font-mono text-xs overflow-x-auto">
                <code>
                    <CodeLine lineNumber={1}>
                        <span style={{ color: colors.purple }}>import</span>
                        <span> React, {'{'} </span>
                        <span style={{ color: colors.variable }}>useState</span>
                        <span>, </span>
                        <span style={{ color: colors.variable }}>useEffect</span>
                        <span> {'}'} </span>
                        <span style={{ color: colors.purple }}>from</span>
                        <span style={{ color: colors.string }}> 'react'</span>
                        <span>;</span>
                    </CodeLine>
                    <CodeLine lineNumber={2}>&nbsp;</CodeLine>
                    <CodeLine lineNumber={3}>
                        <span style={{ color: colors.keyword }}>const</span>
                        <span style={{ color: colors.function }}> UserProfile </span>
                        <span>= ({'{'} </span>
                        <span style={{ color: colors.variable }}>userId</span>
                        <span> {'}'}) =&gt; {'{'}</span>
                    </CodeLine>
                    <CodeLine lineNumber={4}>
                        <span className="pl-4">
                            <span style={{ color: colors.keyword }}>const</span>
                            <span> [</span>
                            <span style={{ color: colors.variable }}>user</span>
                            <span>, </span>
                            <span style={{ color: colors.function }}>setUser</span>
                            <span>] = </span>
                            <span style={{ color: colors.function }}>useState</span>
                            <span>(</span>
                            <span style={{ color: colors.keyword }}>null</span>
                            <span>);</span>
                        </span>
                    </CodeLine>
                    <CodeLine lineNumber={5}>&nbsp;</CodeLine>
                    <CodeLine lineNumber={6}>
                        <span className="pl-4">
                            <span style={{ color: colors.function }}>useEffect</span>
                            <span>{'(() => {'}</span>
                        </span>
                    </CodeLine>
                    <CodeLine lineNumber={7}>
                        <span className="pl-8">
                            <span style={{ color: colors.keyword }}>const</span>
                            <span style={{ color: colors.function }}> loadUserData </span>
                            <span>= </span>
                            <span style={{ color: colors.keyword }}>async</span>
                            <span> () =&gt; {'{'}</span>
                        </span>
                    </CodeLine>
                    <CodeLine lineNumber={8}>
                        <span className="pl-12" style={{ color: colors.comment }}>// Fetch user data from an API</span>
                    </CodeLine>
                    <CodeLine lineNumber={9}>
                        <span className="pl-12">
                            <span style={{ color: colors.keyword }}>const</span>
                            <span> userData = </span>
                            <span style={{ color: colors.keyword }}>await</span>
                            <span> fetchData(</span>
                            <span style={{ color: colors.variable }}>userId</span>
                            <span>);</span>
                        </span>
                    </CodeLine>
                    <CodeLine lineNumber={10}>
                         <span className="pl-12">
                            <span style={{ color: colors.function }}>setUser</span>
                            <span>(userData);</span>
                        </span>
                    </CodeLine>
                    <CodeLine lineNumber={11}>
                        <span className="pl-8">{'};'}</span>
                    </CodeLine>
                    <CodeLine lineNumber={12}>&nbsp;</CodeLine>
                    <CodeLine lineNumber={13}>
                        <span className="pl-8">
                            <span style={{ color: colors.function }}>loadUserData</span>
                            <span>();</span>
                        </span>
                    </CodeLine>
                    <CodeLine lineNumber={14}>
                        <span className="pl-4">{'}, ['}</span>
                        <span style={{ color: colors.variable }}>userId</span>
                        <span>{']);'}</span>
                    </CodeLine>
                    <CodeLine lineNumber={15}>&nbsp;</CodeLine>
                    <CodeLine lineNumber={16}>
                        <span className="pl-4">
                             <span style={{ color: colors.keyword }}>if</span>
                             <span> (!</span>
                             <span style={{ color: colors.variable }}>user</span>
                             <span>) {'{'} </span>
                             <span style={{ color: colors.keyword }}>return</span>
                             <span> &lt;</span>
                             <span style={{ color: colors.keyword }}>div</span>
                             <span>&gt;Loading...&lt;/</span>
                             <span style={{ color: colors.keyword }}>div</span>
                             <span>&gt;; {'}'}</span>
                        </span>
                    </CodeLine>
                    <CodeLine lineNumber={17}>&nbsp;</CodeLine>
                     <CodeLine lineNumber={18}>
                        <span className="pl-4">
                            <span style={{ color: colors.keyword }}>return</span>
                            <span> &lt;</span>
                            <span style={{ color: colors.keyword }}>h1</span>
                            <span>&gt;{'{'}</span>
                            <span style={{ color: colors.variable }}>user</span>
                            <span>?.</span>
                            <span style={{ color: colors.variable }}>name</span>
                            <span>{'}'}&lt;/</span>
                            <span style={{ color: colors.keyword }}>h1</span>
                            <span>&gt;;</span>
                        </span>
                    </CodeLine>
                     <CodeLine lineNumber={19}>
                        <span>{'}'};</span>
                    </CodeLine>
                </code>
            </pre>
        </div>
    );
};