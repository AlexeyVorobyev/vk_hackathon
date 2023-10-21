import React, {FC, useCallback, useState} from 'react';
import {
    Card,
    CardGrid,
    Cell,
    Div,
    Group,
    Header,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Tabs,
    TabsItem
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import png1 from './../img/achievements/1.png'
import png2 from './../img/achievements/2.png'
import png3 from './../img/achievements/3.png'
import png4 from './../img/achievements/4.png'
import {PAGE_USERPROFILE} from "../index";
import {useRouter} from "@happysanta/router";
import {BOTTOM_PADDING_GLOBAL} from "../globalVars";


const tasks = [
    {icon: png1, text: 'Текст для первой задачи', description: 'Высота не предел!'},
    {icon: png2, text: 'Текст для второй задачи', description: 'Они живые, но как неживые'},
    {icon: png3, text: 'Текст для третьей задачи', description: 'Ударные биты'},
    {icon: png4, text: 'Текст для четвертой задачи', description: 'Театр - наше все'}
];

const medals = [
    {icon: png1, text: 'Текст для первой медали', description: 'Описание первой медали'},
];

interface IProps {
    id: string,
}

const Achievements: FC<IProps> = ({
                                      id,
                                  }) => {
    const [activeTab, setActiveTab] = useState("Медали");
    const router = useRouter()

    const renderContent = useCallback(() => {
        const items = activeTab === "Задания" ? tasks : medals;
        const headerText = activeTab === "Задания" ? "Выполняй задания и получай баллы" : "Твои награды за задания";

        return (
            <Group mode="plain" header={<Header mode="secondary">{headerText}</Header>}>
                <CardGrid size="l">
                    {items.map((item, index) => (
                        <Card key={index} mode="shadow">
                            <Cell
                                before={<img src={item.icon} alt={`Icon ${index}`}/>}
                                // @ts-ignore
                                description={item.description}
                            >
                                {item.text}
                            </Cell>
                        </Card>
                    ))}
                </CardGrid>
            </Group>
        );
    }, [activeTab]);

    return (
        <Panel id={id} style={{paddingBottom:BOTTOM_PADDING_GLOBAL}}>
            <PanelHeader before={<PanelHeaderBack
                onClick={() => router.pushPage(PAGE_USERPROFILE)}/>}>Достижения</PanelHeader>

            <Div>
                <Tabs>
                    <TabsItem onClick={() => setActiveTab("Задания")} selected={activeTab === "Задания"}>
                        Задания
                    </TabsItem>
                    <TabsItem onClick={() => setActiveTab("Медали")} selected={activeTab === "Медали"}>
                        Медали
                    </TabsItem>
                </Tabs>

                {renderContent()}
            </Div>

            <Div style={{paddingBottom: '12px'}}>
                <Header>Накоплено баллов: 350</Header>
            </Div>
        </Panel>
    );
}

export default Achievements;
