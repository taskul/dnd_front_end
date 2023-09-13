import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/**
 * API Class
 * for managing getting data from APIs
 */

class User {
    // the token for interaction with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${User.token}` };
        const params = (method === "get") ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // log into dnd_game application
    static async login(formData, guildToken) {
        let data = { ...formData, guildToken }
        let response = await this.request(`auth/login`, data, 'post');
        return response.token;
    }

    // sign up for dnd_game application
    static async signup(formData, guildToken) {
        let data = { ...formData, guildToken }
        let response = await this.request('auth/signup', data, 'post');
        return response.token;
    }

    // get current user
    static async getCurrentUser(username) {
        let response = await this.request(`users/${username}`)
        return response.user.username;
    }

    // -------------------------Map CRUD APIs---------------------- 

    // API call for this comes from MapManager.js located in Pages/User/MapsDashboard
    static async createMap(map_name, username, map_assets) {
        let data = { map_name, username, map_assets }
        let response = await this.request(`maps/create/${username}`, data, 'post');
        return response.mapName;
    }

    // API call for this comes from MapManager.js located in Pages/User/MapsDashboard
    static async getMap(username) {
        let response = await this.request(`maps/${username}`);
        return response;
    }

    // API call for this comes from MapCard.js located in Pages/User/MapsDashboard
    static async getMapByID(game_map_id, username) {
        const data = {}
        let response = await this.request(`maps/assets/${game_map_id}/${username}`, data)
        return response
    }
    // API call for this comes from MapManager.js located in Pages/User/MapsDashboard
    static async deleteMap(game_map_id, username) {
        const data = {}
        let response = await this.request(`maps/${game_map_id}/${username}`, data, 'delete')
        return response;
    }

    // -------------------------Guild CRUD APIs---------------------- 

    // API call for this comes from GuildManager.js located in Pages/User/GuildsDashboard
    static async createGuild(guild_name, guild_img, username) {
        const data = { guild_name, guild_img, username }
        let response = await this.request(`guilds/create`, data, 'post')
        return response;
    }

    // API call for this comes from GuildMembers.js located in Pages/User/GuildsDashboard
    static async createGuildToken(guild_token, guild_id, username) {
        const data = { guild_token, guild_id }
        let response = await this.request(`guilds/create/token/${username}`, data, 'post')
        return response
    }

    // API call for this comes from GuildMembers.js located in Pages/User/GuildsDashboard
    static async getGuildToken(guild_id, username) {
        const data = {};
        let response = await this.request(`guilds/token/${guild_id}/${username}`, data);
        return response
    }

    // API call for this comes from GuildManager.js located in Pages/User/GuildsDashboard
    static async getGuild(username) {
        let response = await this.request(`guilds/${username}`);
        return response;
    }

    // API call for this comes from GuildMembers.js located in Pages/User/GuildsDashboard
    static async getAllGuildMembers(guild_id, username) {
        let response = await this.request(`guilds/members/${guild_id}/${username}`);
        return response;
    }

    // API call for this comes from GuildManager.js located in Pages/User/GuildsDashboard
    static async deleteGuild(guild_id, username) {
        const data = {}
        let response = await this.request(`guilds/${guild_id}/${username}`, data, 'delete')
        return response;
    }

    // API call for this comes from a user that is not the owner of the guild, GuildsManager.js located in Pages/User/GuildsDashboard
    static async leaveGuild(guild_id, username) {
        const data = { guild_id, username };
        let response = await this.request(`guilds/leave/${guild_id}/${username}`, data, 'delete');
        return response;
    }



    // -------------------------Campaigns CRUD APIs---------------------- 

    // API call for this comes from CampaignManager.js located in Pages/User/CampaignDashboard
    static async createCampaign(campaign_name, guild_id) {
        let data = { campaign_name, guild_id };
        let response = await this.request(`campaigns/create`, data, 'post');
        return response;
    };

    // API call for this comes from CampaignManager.js located in Pages/User/CampaignDashboard
    static async addCampaignMember(campaign_id, guild_id, username, owner) {
        let data = { campaign_id, guild_id, owner };
        let response = await this.request(`campaigns/add_campaign_member/${username}`, data, 'post');
        return response;
    };

    // API call for this comes from CampaignManager.js located in Pages/User/CampaignDashboard
    static async getCampaign(username) {
        let response = await this.request(`campaigns/${username}`);
        return response;
    }


    // API call for this comes from CampaignManager.js located in Pages/User/CampaignDashboard
    static async deleteCampaign(campaign_id, username) {
        let data = {}
        let response = await this.request(`campaigns/${campaign_id}/${username}`, data, 'delete');
        return response;
    }

    // -------------------------Character CRUD APIs---------------------- 
    // API call for this comes from CharacterManager.js located in Pages/User/CharacterDashboard
    static async createCharacter(char_name, username) {
        const data = { char_name, username };
        let response = await this.request(`characters/create`, data, 'post');
        return response;
    }

    // API call for this comes from CharacterManager.js located in Pages/User/CharacterDashboard
    static async getCharacters(username) {
        let response = await this.request(`characters/${username}`);
        return response;
    }



    //--------------------------------Character Info

    static async getCharactersInfo(char_id, username) {
        let response = await this.request(`characters/info/${char_id}/${username}`)
        return response;
    }

    static async createCharacterInfo(char_id, char_race, char_alignment, char_class, exp_points, char_level, username) {
        const data = { char_id, char_race, char_alignment, char_class, exp_points, char_level }
        let response = await this.request(`characters/create/info/${username}`, data, 'post');
        return response;
    }

    static async updateCharacterInfo(char_race, char_alignment, char_class, exp_points, char_level, char_id, username) {
        const data = { char_race, char_alignment, char_class, exp_points, char_level, char_id }
        let response = await this.request(`characters/patch/info/${username}`, data, 'put');
        return response;
    }



    //--------------------------------Character Avatar
    static async getCharactersAvatar(char_id) {
        let response = await this.request(`characters/avatar/${char_id}`)
        return response;
    }

    static async createCharacterAvatar(char_id, img_url, username) {
        const data = { char_id, img_url }
        let response = await this.request(`characters/create/avatar/${username}`, data, 'post');
        return response;
    }

    static async updateCharacterAvatar(char_id, img_url, username) {
        const data = { char_id, img_url }
        let response = await this.request(`characters/patch/avatar/${username}`, data, 'put');
        return response;
    }




    //--------------------------------Character Base Stats
    static async createCharacterBaseStats(char_id, strength, dexterity, constitution, intelligence, wisdom, charisma, username) {
        const data = { char_id, strength, dexterity, constitution, intelligence, wisdom, charisma }
        let response = await this.request(`characters/create/base_stats/${username}`, data, 'post');
        return response;
    }

    static async updateCharacterBaseStats(char_id, strength, dexterity, constitution, intelligence, wisdom, charisma, username) {
        const data = { char_id, strength, dexterity, constitution, intelligence, wisdom, charisma }
        let response = await this.request(`characters/patch/base_stats/${username}`, data, 'put');
        return response;
    }




    //--------------------------------Character health and armor
    static async createCharacterHealth(char_id, hit_points, temp_hit_points, armor_class, inspiration, initiative, speed, prof_bonus, hit_dice, username) {
        const data = { char_id, hit_points, temp_hit_points, armor_class, inspiration, initiative, speed, prof_bonus, hit_dice }
        let response = await this.request(`characters/create/health/${username}`, data, 'post');
        return response;
    }

    static async updateCharacterHealth(char_id, hit_points, temp_hit_points, armor_class, inspiration, initiative, speed, prof_bonus, hit_dice, username) {
        const data = { char_id, hit_points, temp_hit_points, armor_class, inspiration, initiative, speed, prof_bonus, hit_dice }
        let response = await this.request(`characters/patch/health/${username}`, data, 'put');
        return response;
    }




    //--------------------------------Character Saving Throws
    static async createCharacterSavingThrows(char_id, str, dex, con, intel, wis, cha, username) {
        const data = { char_id, str, dex, con, intel, wis, cha }
        let response = await this.request(`characters/create/saving_throws/${username}`, data, 'post');
        return response;
    }

    static async updateCharacterSavingThrows(char_id, str, dex, con, intel, wis, cha, username) {
        const data = { char_id, str, dex, con, intel, wis, cha }
        let response = await this.request(`characters/patch/saving_throws/${username}`, data, 'put');
        return response;
    }




    //--------------------------------Character Skills
    static async createCharacterSkills(char_id, acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival, username) {

        const data = { char_id, acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival }

        let response = await this.request(`characters/create/skills/${username}`, data, 'post');
        return response;
    }

    static async updateCharacterSkills(char_id, acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival, username) {

        const data = { char_id, acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival }

        let response = await this.request(`characters/patch/skills/${username}`, data, 'put');
        return response;
    }




    //--------------------------------Character Equipment
    static async createCharacterEquipment(char_id, copper, silver, electrum, gold, platinum, equipment, username) {
        const data = { char_id, copper, silver, electrum, gold, platinum, equipment }

        let response = await this.request(`characters/create/equipment/${username}`, data, 'post');
        return response;
    }

    static async updateCharacterEquipment(char_id, copper, silver, electrum, gold, platinum, equipment, username) {
        const data = { char_id, copper, silver, electrum, gold, platinum, equipment }

        let response = await this.request(`characters/patch/equipment/${username}`, data, 'put');
        return response;
    }



    //--------------------------------Character Weapons
    static async createCharacterWeapons(char_id, weapon1, atk_bonus, damage_type, weapon2, atk_bonus2, damage_type2, weapon3, atk_bonus3, damage_type3, weapon4, atk_bonus4, damage_type4, weapon5, atk_bonus5, damage_type5, username) {

        const data = { char_id, weapon1, atk_bonus, damage_type, weapon2, atk_bonus2, damage_type2, weapon3, atk_bonus3, damage_type3, weapon4, atk_bonus4, damage_type4, weapon5, atk_bonus5, damage_type5 }

        let response = await this.request(`characters/create/weapons/${username}`, data, 'post');
        return response;
    }

    static async updateCharacterWeapons(char_id, weapon1, atk_bonus, damage_type, weapon2, atk_bonus2, damage_type2, weapon3, atk_bonus3, damage_type3, weapon4, atk_bonus4, damage_type4, weapon5, atk_bonus5, damage_type5, username) {

        const data = { char_id, weapon1, atk_bonus, damage_type, weapon2, atk_bonus2, damage_type2, weapon3, atk_bonus3, damage_type3, weapon4, atk_bonus4, damage_type4, weapon5, atk_bonus5, damage_type5 }

        let response = await this.request(`characters/patch/weapons/${username}`, data, 'put');
        return response;
    }




    //--------------------------------Character Spells
    static async createCharacterSpells(char_id, spells, username) {
        const data = { char_id, spells }
        let response = await this.request(`characters/create/spells/${username}`, data, 'post');
        return response;
    }

    static async updateCharacterSpells(char_id, spells, username) {
        const data = { char_id, spells }
        let response = await this.request(`characters/patch/spells/${username}`, data, 'put');
        return response;
    }



    //--------------------------------Character proficiencies
    static async createCharacterProficiencies(char_id, proficiencies, username) {
        const data = { char_id, proficiencies }
        let response = await this.request(`characters/create/proficiencies/${username}`, data, 'post');
        return response;
    }

    static async updateCharacterProficiencies(char_id, proficiencies, username) {
        const data = { char_id, proficiencies }
        let response = await this.request(`characters/patch/proficiencies/${username}`, data, 'put');
        return response;
    }
    //--------------------------------Delete Characgter
    static async deleteCharacter(char_id, username) {
        const data = {};
        let response = await this.request(`characters/${char_id}/${username}`, data, 'delete');
        return response;
    }



    //--------------------------------Game Chat rooms
    static async createGameRoom(campaign_name, campaign_id, username) {
        const data = { campaign_name, campaign_id }
        let response = await this.request(`game/chat/create/${username}`, data, 'post');
        return response;
    }

    static async getGameRoom(campaign_name, campaign_id, username) {
        let response = await this.request(`game/chat/${campaign_id}/${campaign_name}/${username}`);
        return response;
    }


    //--------------------------------Game messages
    static async createMessage(chat_id, username, message) {
        const data = { message }
        let response = await this.request(`game/msg/create/${chat_id}/${username}`, data, 'post');
        return response;
    }

    static async getMessages(chat_id, campaign_name, username) {
        let response = await this.request(`game/msg/${chat_id}/${campaign_name}/${username}`);
        return response;
    }

    //--------------------------------Game characters
    static async createChatCharacter(chat_id, char_id, char_name, username) {
        const data = { char_name }
        let response = await this.request(`game/char/create/${chat_id}/${char_id}/${username}`, data, 'post');
        return response;
    }

    static async updateChatCharacter(chat_id, char_id, char_name, username) {
        const data = { char_name }
        let response = await this.request(`game/char/patch/${chat_id}/${char_id}/${username}`, data, 'put');
        return response;
    }

    static async getChatCharacter(chat_id, username) {
        let response = await this.request(`game/char/${chat_id}/${username}`);
        return response;
    }
};

export default User;