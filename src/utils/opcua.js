import { OPCUAClient, ClientSubscription, ClientMonitoredItem, AttributeIds, DataType } from 'node-opcua';
import store from '@/store'
import { getProjects } from '@/utils/settingDB';
import bus from '@/utils/bus';
import { getAssetFilePath } from '@/utils/etc';

let clients = [];
let sessions = [];

const option = {
    certificateFile: getAssetFilePath('client_selfsigned_cert_2048.pem'),
    privateKeyFile: getAssetFilePath('private_key.pem'),
    endpoint_must_exist: false
};

export const connectOPC = () => {
    const projects = getProjects();
    store.commit('insertData', []);
    projects.forEach((project, projectIndex) => {
        const projectName = project.name;
        const stations = project.stations;
        stations.forEach(async (station, stationIndex) => {
            const stationName = station.name

            store.commit('insertRealTime', {
                projectName,
                stationName,
                state: false,
                barcode: '',
                updatedAt: '',
                node: [
                    ...station.nodes.filter(n => n.use).map(
                        n => ({
                            name: n.name,
                            value: ''
                        })
                    )
                ]
            })

            /* const opcUrl = `opc.tcp://${station.url}:${station.port}`;
            const client = OPCUAClient.create(option);
            await client.connect(opcUrl);
            clients.push(client);
            const session = await client.createSession(null);
            const subscription = await ClientSubscription.create(session, {
                requestedPublishingInterval: 500,
                publishingEnabled: true,
                priority: 10
            });

            subscription.on('started', () => {
                setInterval(() => {

                });
            }); */
        })
    });
}

export const disconnectOPC = () => {

}

export const checkOPC = async (url, port, callback) => {
    try {
        const opcUrl = `opc.tcp://${url}:${port}`;
        const client = OPCUAClient.create(option);
        await client.connect(opcUrl);
        const session = await client.createSession();
        const browseResult = await session.browse("ns=3;s=\"As\".\"DATA\"");
        const result = await Promise.all(browseResult.references.map(async b => {
            const dataName = b.browseName.name
            const nodeId = 'ns=3;s=' + b.nodeId.value
            const dataValue = (await session.readVariableValue(nodeId)).value.value
            return {
                dataName,
                dataValue: (Array.isArray(dataValue)) ? dataValue[1] : dataValue,
                nodeId,
                use: false,
                standard: {min: 0, max: 0, equal: 'True'}
            }
        }));
        await client.disconnect();
        callback(result);
    } catch (error) {
        callback(null);
    }
}
