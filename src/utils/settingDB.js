import fs from 'fs'
import { JSONFileSyncPreset } from 'lowdb/node'
import { getAssetFilePath } from '@/utils/etc'

const password = '1497';

const projectsStr = fs.readFileSync(getAssetFilePath('project-sample.json'));
const projects = JSON.parse(projectsStr)['projects'];

const defaultData = {
    password,
    projects,
    darkMode: false,
    autoLaunch: false,
    autoSave: {
        active: false,
        path: ''
    }
};

const db = JSONFileSyncPreset('db.json', defaultData);

const getProjects = () => [...db.data.projects]

const setProjects = (projects) => {
    db.data.projects = projects
    db.write()
}

export {
    getProjects,
    setProjects
}
