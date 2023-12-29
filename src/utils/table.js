import stringify from 'csv-stringify';
import fs from 'fs';
import { upperFirst } from 'lodash';
import { getProjects } from '@/utils/settingDB';
import { getCollection } from '@/utils/dataDB';
import moment from 'moment';

const projects = getProjects()

const sampleData = {}

let id = 0

function generateRandomNumber(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

projects.forEach((project) => {
    const projectName = project.name
    sampleData[projectName] = []
    for (let i = 0; i ++; i < 100) {
        id ++
        const barcode = generateRandomNumber(10)
        const createdAt = new Date()
        const updatedAt = createdAt
        const stations = project.stations.map((station) => {
            return {
                name: station.name,
                nodes: station.nodes.map((n) => ({
                    name: node.name,
                    value: 0
                    }))
            } 
        })
        const saveData = {
            id,
            barcode,
            createdAt,
            updatedAt,
            stations
        }
    }
})

export const saveCsvFile = (values, columns, filePath) => {
    return new Promise((res, rej) => {
        stringify(values, { header: true, columns }, (err, output) => {
            if (err) {
                rej(err);
                return;
            }
            fs.writeFile(filePath, output, (err) => {
                if (err) {
                    rej(err);
                    return;
                }
            });
        });
    });
}

export const loadColumns = (project) => {
    return [
        ...['barcode', 'createdAt', 'updatedAt'].map((name) => ({
            title: upperFirst(name),
            dataIndex: name,
            key: name
        })),
        ...project['station'].map((station) => ({
            title: upperFirst(station.name),
            children: station.node.filter((n) => n.isSave)
                .map((n) => ({
                    title: upperFirst(n.name),
                    dataIndex: `${n.name}-${station.name}`,
                    key: n.name,
                    standard: n['standard']
                }))
        }))
    ]
}

export const loadDataSource = async (
    name = '', paging, search = '', date = []
) => {
    if (name == '') return [];
    const collection = getCollection(name);
    if (!collection) return [];
    const query = {};

    if (search.length > 0) query.productId = { '$regex': search };
    if (date.length > 1) {
        query.createdAt = {
            '$gte': moment(date[0]).toDate(),
            '$lt': moment(date[1]).toDate(),
        }
    }
    let pageCount = 0;
    if (!paging) {
        pageCount = await collection.find(query).count();
    }
    paging = 1

    let dataSource = await collection.find(query).sort({ createdAt: -1 }).limit(10)
        .skip((paging - 1) * 10).toArray();
    dataSource = dataSource.map((saveData) => {
        const key = saveData['id'].toString() || '1';
        const barcode = saveData['productId'] || saveData['barcode'] || '';
        const createdAt = moment(saveData['createdAt']).format('YYYY-MM-DD h:mm:ss a');
        const updatedAt = moment(saveData['updatedAt']).format('YYYY-MM-DD h:mm:ss a');
        const data = saveData['stations'].map((station) => station['data'].reduce((acc, one) => {
            let dataValue = one.dataValue

              if (typeof dataValue === 'boolean') {
                dataValue = (dataValue) ? 'True' : 'False'
              }

              if (!Number.isInteger(dataValue)) {
                dataValue = dataValue.toFixed(1)
              }

              return {...acc, [one.dataName + '-' + (station.stationName)]: dataValue}
        }, {})).reduce((acc, one) => ({...acc, ...one}), {});
        return {
            key,
            barcode,
            createdAt,
            updatedAt,
            ...data
        }
    });

    return { dataSource, pageCount };
}

export const isOkData = (value, standard) => {

}
