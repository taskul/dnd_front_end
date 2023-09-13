import "../../Pages/User/CharacterDashboard/CharacterBuilder.css";
import "../../GeneralComponents/TextStyles.css"
import { useState, useCallback } from "react";


export default function CharacterSheet({ closeModal, char_name, char_info }) {
    const [baseStatsTab, setBaseStatsTab] = useState(true);
    const [appearenceTab, setAppearenceTab] = useState();

    let { charactersInfo, avatar, charBaseStats, health, savingThrows, skills, equipment, weapons, spells, proficiencies } = char_info;

    // Manages tabs 
    const changeTabState = useCallback((e) => {
        if (e.target.id === "tab-stats") {
            setBaseStatsTab(true);
            setAppearenceTab(false);
        } else if (e.target.id === "tab-appearence") {
            setAppearenceTab(true);
            setBaseStatsTab(false);
        }
    })


    return (
        <div className="character-builder-frame">
            {/* Exit button */}
            <div className="exit-button-holder">
                <button type="button" className="exit-modal" onClick={closeModal}>X</button>
            </div>
            <p className="white-titles">Character Name: {char_name}</p>
            {/* Tabs */}
            <div className="character-tabs">
                <button className={baseStatsTab ? `character-tablinks active` : "character-tablinks"} id="tab-stats" onClick={changeTabState}>Base Info</button>
                <button className={appearenceTab ? `character-tablinks active` : "character-tablinks"} id="tab-appearence" onClick={changeTabState}>Attacks/Spells</button>
            </div>
            {baseStatsTab ?
                <div className="character-builder-tabs-container">
                    <div className="avatar-frame">
                        {avatar
                            ?
                            < img
                                src={avatar.img_url ? avatar.img_url : "/avatars/druid.png"}
                                className="avatar-img"
                            />
                            :
                            null
                        }
                    </div>

                    {/* Character Base info */}
                    <div className="character-info">
                        <h3 className="white-titles underlined">Base info:</h3>
                        <p className="white-titles">race: {charactersInfo ? charactersInfo.char_race : "--"}</p>
                        <p className="white-titles">alignment: {charactersInfo ? charactersInfo.char_alignment : "--"}</p>
                        <p className="white-titles">character class: {charactersInfo ? charactersInfo.char_class : "--"}</p>
                        <p className="white-titles">expirience: {charactersInfo ? charactersInfo.exp_points : "--"}</p>
                        <p className="white-titles">level: {charactersInfo ? charactersInfo.char_level : "--"}</p>
                    </div>

                    {/* Character Health and armor class */}
                    <div className="character-info">
                        <h3 className="white-titles underlined">Health and Armor class:</h3>
                        <p className="white-titles">hit points: {health ? health.hit_points : "--"}</p>
                        <p className="white-titles">temp hit points: {health ? health.temp_hit_points : "--"}</p>
                        <p className="white-titles">armor class: {health ? health.armor_class : "--"}</p>
                        <p className="white-titles">inspiration: {health ? health.inspiration : "--"}</p>
                        <p className="white-titles">initiative: {health ? health.initiative : "--"}</p>
                        <p className="white-titles">speed: {health ? char_info.health.speed : "--"}</p>
                        <p className="white-titles">prof bonus: {health ? health.prof_bonus : "--"}</p>
                        <p className="white-titles">hit dice: {health ? char_info.health.hit_dice : "--"}</p>
                    </div>


                    {/* Character Base stats*/}
                    <div className="character-info">
                        <h3 className="white-titles underlined">Stats:</h3>
                        <p className="white-titles">strength: {charBaseStats ? charBaseStats.strength : "--"}</p>
                        <p className="white-titles">dexterity: {charBaseStats ? charBaseStats.dexterity : "--"}</p>
                        <p className="white-titles">constitution: {charBaseStats ? charBaseStats.constitution : "--"}</p>
                        <p className="white-titles">intelligence: {charBaseStats ? charBaseStats.intelligence : "--"}</p>
                        <p className="white-titles">wisdom: {charBaseStats ? charBaseStats.wisdom : "--"}</p>
                        <p className="white-titles">charisma: {charBaseStats ? charBaseStats.charisma : "--"}</p>
                    </div>

                    {/* Character Saving Throws*/}
                    <div className="character-info">
                        <h3 className="white-titles underlined">Saving Throws:</h3>
                        <p className="white-titles">strength: {savingThrows ? savingThrows.str : "--"}</p>
                        <p className="white-titles">dexterity: {savingThrows ? savingThrows.dex : "--"}</p>
                        <p className="white-titles">constitution: {savingThrows ? savingThrows.con : "--"}</p>
                        <p className="white-titles">intelligence: {savingThrows ? savingThrows.intel : "--"}</p>
                        <p className="white-titles">wisdom: {savingThrows ? savingThrows.wis : "--"}</p>
                        <p className="white-titles">charisma: {savingThrows ? savingThrows.cha : "--"}</p>
                    </div>
                    {/* Character skills */}
                    <div className="character-info">
                        <h3 className="white-titles underlined">Skills:</h3>
                        <p className="white-titles">acrobatics: {skills ? skills.acrobatics : "--"}</p>
                        <p className="white-titles">animal handling: {skills ? skills.animalhandling : "--"}</p>
                        <p className="white-titles">arcana: {skills ? skills.arcana : "--"}</p>
                        <p className="white-titles">athletics: {skills ? skills.athletics : "--"}</p>
                        <p className="white-titles">deception: {skills ? skills.deception : "--"}</p>
                        <p className="white-titles">history: {skills ? skills.history : "--"}</p>
                        <p className="white-titles">insight: {skills ? skills.insight : "--"}</p>
                        <p className="white-titles">intimidation: {skills ? skills.intimidation : "--"}</p>
                        <p className="white-titles">medicine: {skills ? skills.medicine : "--"}</p>
                        <p className="white-titles">nature: {skills ? skills.nature : "--"}</p>
                        <p className="white-titles">perception: {skills ? skills.perception : "--"}</p>
                        <p className="white-titles">performance: {skills ? skills.performance : "--"}</p>
                        <p className="white-titles">persuasion: {skills ? skills.persuasion : "--"}</p>
                        <p className="white-titles">religion: {skills ? skills.religion : "--"}</p>
                        <p className="white-titles">sleight of hand: {skills ? skills.sleightofhand : "--"}</p>
                        <p className="white-titles">stealth: {skills ? skills.stealth : "--"}</p>
                        <p className="white-titles">survival: {skills ? skills.survival : "--"}</p>
                    </div>
                    {/* Character Equipment*/}
                    <div className="character-info">
                        <h3 className="white-titles underlined">Equipment:</h3>
                        <p className="white-titles">copper: {equipment ? equipment.copper : "--"}</p>
                        <p className="white-titles">silver: {equipment ? equipment.silver : "--"}</p>
                        <p className="white-titles">electrum: {equipment ? equipment.electrum : "--"}</p>
                        <p className="white-titles">gold: {equipment ? equipment.gold : "--"}</p>
                        <p className="white-titles">platinum: {equipment ? equipment.platinum : "--"}</p>
                        <p className="white-titles">equipment: {equipment ? equipment.equipment : "--"}</p>
                    </div>
                </div>
                :
                null
            }

            {appearenceTab ?

                <div className="character-builder-tabs-container">

                    {/* Character Attacks/Weapons */}
                    <div className="character-info">
                        <h3 className="white-titles underlined">Weapons/Attacks:</h3>
                        <p className="white-titles">weapon: {weapons ? weapons.weapon1 : "--"}</p>
                        <p className="white-titles">attack bonus: {weapons ? weapons.atk_bonus : "--"}</p>
                        <p className="white-titles">damange type: {weapons ? weapons.damage_type : "--"}</p>
                        <p className="white-titles">weapon: {weapons ? weapons.weapon2 : "--"}</p>
                        <p className="white-titles">attack bonus: {weapons ? weapons.atk_bonus2 : "--"}</p>
                        <p className="white-titles">damange type: {weapons ? weapons.damage_type2 : "--"}</p>
                        <p className="white-titles">weapon: {weapons ? weapons.weapon3 : "--"}</p>
                        <p className="white-titles">attack bonus: {weapons ? weapons.atk_bonus3 : "--"}</p>
                        <p className="white-titles">damange type: {weapons ? weapons.damage_type3 : "--"}</p>
                        <p className="white-titles">weapon: {weapons ? weapons.weapon4 : "--"}</p>
                        <p className="white-titles">attack bonus: {weapons ? weapons.atk_bonus4 : "--"}</p>
                        <p className="white-titles">damange type: {weapons ? weapons.damage_type4 : "--"}</p>
                        <p className="white-titles">weapon: {weapons ? weapons.weapon5 : "--"}</p>
                        <p className="white-titles">attack bonus: {weapons ? weapons.atk_bonus5 : "--"}</p>
                        <p className="white-titles">damange type: {weapons ? weapons.damage_type5 : "--"}</p>
                    </div>

                    {/* Character Spells */}
                    <div className="character-info">
                        <h3 className="white-titles underlined">spells:</h3>
                        <p className="white-titles">{spells ? spells.spells : "--"}</p>
                    </div>

                    {/* Character Proficiencies */}
                    <div className="character-info">
                        <h3 className="white-titles underlined">proficiencies:</h3>
                        <pre className="white-titles">{proficiencies ? proficiencies.proficiencies : "--"}</pre>
                    </div>

                </div>
                :
                null
            }
        </div >
    )
}

