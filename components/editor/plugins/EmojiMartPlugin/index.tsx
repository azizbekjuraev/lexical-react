import React from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data/sets/14/apple.json';

const EmojiMartPlugin = ({ onEmojiSelect }: { onEmojiSelect: (emoji: string) => void }) => {
    return (
        <Picker
            onEmojiSelect={onEmojiSelect}
            data={data}
            native={true}
            set="apple"
            emoji="point_up"
            title="Pick your emoji..."
            emojiSize={24}
            perLine={6}
            theme="light"
            sheetSize={16}
            showPreview={true}
            showSkinTones={false}
            notFoundEmoji="sleuth_or_spy"
        />
    );
};

export default EmojiMartPlugin;
