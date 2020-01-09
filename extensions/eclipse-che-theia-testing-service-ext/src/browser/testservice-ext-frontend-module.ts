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

import { ContainerModule } from 'inversify';
import { LanguagesMainImpl } from '@theia/plugin-ext/lib/main/browser/languages-main';
import { LanguagesMainTestImpl } from './languages-test-main';
import { PluginHandleRegistry } from './plugin-handle-registry';
import { MainPluginApiProvider } from '@theia/plugin-ext';
import { TestApiProvider } from './test-api-provider';

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    bind(TestApiProvider).toSelf().inSingletonScope();
    bind(MainPluginApiProvider).toService(TestApiProvider);

    bind(PluginHandleRegistry).toSelf().inSingletonScope();
    rebind(LanguagesMainImpl).to(LanguagesMainTestImpl).inTransientScope();
});
