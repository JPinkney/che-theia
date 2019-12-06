/* --------------------------------------------------------------------------------------------
 * Copyright (c) Red Hat, Inc. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from 'vscode';
import * as path from 'path';
require('ts-mocha');
import * as Mocha from 'mocha';

/**
 * This extension should be manually activated via
 *  vscode.extensions.getExtension('api-test-loader')
 * when all the projects in the workspace have been cloned
 *
 * From there it will pick up all tests in the workspace, run them,
 * and the print the results to the console
 */
export function activate(context: vscode.ExtensionContext): void {

    console.log('activating api-test-loader');
    const mocha = new Mocha({
        ui: 'bdd',
        timeout: 30000
    });
    mocha.useColors(true);
    const e = (c) => console.log(c);
    vscode.workspace.findFiles('**/test/*.test.ts', '').then(files => {

        // Add files to the test suite
        files.forEach(f => mocha.addFile(path.resolve(f.path)));

        try {
            // Run the mocha test
            mocha.run(failures => {
                if (failures > 0) {
                    e(new Error(`${failures} tests failed.`));
                } else {
                    e('test');
                }
            });
        } catch (err) {
            e(err);
            console.log(err);
        }
    });
    console.log('Attempting to grab all the tests');
}
