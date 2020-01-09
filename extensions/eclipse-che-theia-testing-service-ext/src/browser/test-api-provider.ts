/********************************************************************************
 * Copyright (C) 2020 Red Hat, Inc. and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { MainPluginApiProvider } from '@theia/plugin-ext/lib/common/plugin-ext-api-contribution';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { injectable, interfaces } from 'inversify';
import { PLUGIN_RPC_CONTEXT } from '../common/test-protocol';
import { TestMainImpl } from './test-main';

@injectable()
export class TestApiProvider implements MainPluginApiProvider {

    initialize(rpc: RPCProtocol, container: interfaces.Container): void {
        rpc.set(PLUGIN_RPC_CONTEXT.TEST_MAIN, new TestMainImpl());
    }

}
