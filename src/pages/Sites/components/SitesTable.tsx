import React, { FC } from 'react';

import {
    Card,
    CardTitle,
    Flex,
    Text,
    TextContent,
    TextVariants,
    Tooltip,
} from '@patternfly/react-core';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { Link } from 'react-router-dom';

import ResourceIcon from '@core/components/ResourceIcon';

import { Labels, SitesRoutesPaths, SitesTableColumns } from '../Sites.enum';
import { SitesTableProps } from '../Sites.interfaces';

const SitesTable: FC<SitesTableProps> = function ({ sites }) {
    return (
        <Card>
            <CardTitle>
                <Flex>
                    <TextContent>
                        <Text component={TextVariants.h1}>{Labels.Sites}</Text>
                    </TextContent>
                    <Tooltip position="right" content={Labels.SitesDescription}>
                        <OutlinedQuestionCircleIcon />
                    </Tooltip>
                </Flex>
            </CardTitle>
            <TableComposable borders={false} variant="compact" isStriped className="sk-table">
                <Thead>
                    <Tr>
                        <Th>{SitesTableColumns.Name}</Th>
                        <Th className="align-th-right">{SitesTableColumns.NumSitesLinked}</Th>
                        <Th className="align-th-right">{SitesTableColumns.NumHosts}</Th>
                        <Th className="align-th-right">{SitesTableColumns.NumProcesses}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {sites.map(({ identity, name, hosts, processes, linkedSites }) => (
                        <Tr key={identity}>
                            <Td>
                                <ResourceIcon type="site" />
                                <Link to={`${SitesRoutesPaths.Sites}/${identity}`}>{name}</Link>
                            </Td>
                            <Td className="align-td-right">{`${linkedSites.length}`}</Td>
                            <Td className="align-td-right">{`${hosts.length}`}</Td>
                            <Td className="align-td-right">{`${processes.length}`}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </TableComposable>
        </Card>
    );
};

export default SitesTable;
