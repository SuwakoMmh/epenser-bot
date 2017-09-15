import { RichEmbed } from 'discord.js';
import { random } from '.';
import settings from '../../settings.json'

export function err(title)
{
    const embed = new RichEmbed()
        .setColor(0xdb1348)
        .setImage(random(settings.images.error));
    if (title) embed.setTitle(title);
    return embed;
}

export function timeDelete(message)
{
    setTimeout(() => message.delete(), 10000);
}