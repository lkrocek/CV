import React from 'react';
import type { Skill } from '../types';

export const SkillNode: React.FC<{ skill: Skill; indentLevel?: number }> = ({ skill, indentLevel = 0 }) => {
    const isCategory = !!skill.children && skill.children.length > 0;
    const indentStyle = { paddingLeft: `${indentLevel * 1.5}rem` };
    
    const tagBracketColor = 'text-cyan-300 font-bold';
    const tagNameColor = 'text-white';
    const selfClosingSlashColor = 'text-cyan-300 font-bold';

    if (isCategory) {
        return (
            <>
                <p style={indentStyle} className="leading-snug">
                    <span className={tagBracketColor}>&lt;</span>
                    <span className={tagNameColor}>{skill.name}</span>
                    <span className={tagBracketColor}>&gt;</span>
                </p>
                <>
                    {skill.children!.map((child, index) => (
                        <SkillNode key={index} skill={child} indentLevel={indentLevel + 1} />
                    ))}
                </>
                <p style={indentStyle} className="leading-snug">
                    <span className={tagBracketColor}>&lt;/</span>
                    <span className={tagNameColor}>{skill.name}</span>
                    <span className={tagBracketColor}>&gt;</span>
                </p>
            </>
        );
    } else {
        return (
             <p style={indentStyle} className="leading-snug">
                 <span className={tagBracketColor}>&lt;</span>
                 <span className={tagNameColor}>{skill.name}</span>
                 <span className={selfClosingSlashColor}> /&gt;</span>
            </p>
        );
    }
};
