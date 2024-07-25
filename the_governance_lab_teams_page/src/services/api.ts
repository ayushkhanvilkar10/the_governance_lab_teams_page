import axios from 'axios';
import { TeamMember } from '../types';

const apiUrl = 'https://content.thegovlab.com/items/team?limit=-1&sort=name&fields[0]=%2A.%2A&fields[1]=picture.%2A&fields[2]=projects.projects_id.%2A';

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
    try {
        const response = await axios.get(apiUrl);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching team members:', error);
        throw error;
    }
};
