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

import { injectable } from 'inversify';
import { LanguageServerAction } from './languages-test-main';
import { LanguagesExt } from '@theia/plugin-ext';

/**
 * This class keeps a registry of which plugins map to which handle
 */

export interface LanguageFeatureRegistration {
    languagesMainImpl: LanguagesExt; // The languagesMain that registered this plugin in the registry
    providerHandles: Map<LanguageServerAction, number>; // A map of language actions to their handle
}

export interface LanguagesMainHandle {
    handle: number;
    languagesMain: LanguagesExt;
}

@injectable()
export class PluginHandleRegistry {
    pluginRegistrationMap: Map<string, LanguageFeatureRegistration> = new Map();

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    private findRegisteredLanguagesMain(pluginID: string, languageServerAction: string): LanguagesMainHandle | undefined {
        const languageFeatureRegistrant = this.pluginRegistrationMap.get(pluginID);
        if (languageFeatureRegistrant) {
            const correctLanguagesMain = languageFeatureRegistrant.languagesMainImpl;
            const correctLanguageServerHandle = languageFeatureRegistrant.providerHandles.get(languageServerAction);
            if (correctLanguageServerHandle) {
                return {
                    handle: correctLanguageServerHandle,
                    languagesMain: correctLanguagesMain
                };
            }
        }
        return undefined;
    }

    async lookupLanguagesMainForPluginAndAction(pluginID: string, languageServerAction: LanguageServerAction): Promise<LanguagesMainHandle | undefined> {
        /**
         * Sometimes a language feature hasn't been registered before a language call is made. That is OK. We can block while waiting for the language server
         * to register the feature with languages-main. The tests will timeout if it hasn't registered in 60 seconds after the test made the original call.
         */
        const amount = 60;
        for (let i = 0; i < amount; i++) {

            const registeredLanguagesMain = this.findRegisteredLanguagesMain(pluginID, languageServerAction);
            if (!registeredLanguagesMain) {
                await this.sleep(1000);
            } else {
                return registeredLanguagesMain;
            }
        }

        return undefined;
    }
}
