# Experimental New Plugin Sample

This is a sample plugin to test the behavior of experimental new plugin system. Add an editor to the app page and run any code.

See also the following pages for more information. (Japanese Only)
- https://cybozu.dev/ja/id/8f57f4783d4913a744222388/

## Requirement

- node >= v18.14.0
- npm >= v9.3.1 or pnpm >= v8.10.0

## Hot to use

### Setup

Install dependencies.

```bash
npm i
```

### Build and upload plugin

#### Initial Packaging

> [!WARNING]
> This task is for the initial setup. Each time you perform this task, the plugin ID will change. For subsequent times, please follow the instructions under `Packaging from the Second Time Onwards`.

If this is your first time packaging this plugin, you will need to generate a private key file (ppk file) along with the plugin file (plugin.zip).

```bash
npm run build:init
```

Running the above command will generate a ppk file under the `dist/` directory.

Replace the `[YOUR_PLUGIN_KEY_PATH]` part in the `build` command of `package.json` with the path to the ppk file.

```
 "pack": "cli-kintone plugin pack --private-key [YOUR_PLUGIN_KEY_PATH].ppk --output ./dist/plugin.zip --input dist/plugin",
```

#### Packaging from the Second Time Onwards

You only have to execute `build` command.

```bash
npm run build
```

#### Upload

Upload automation has not yet been implemented. Please upload plugin.zip manually.

See your kintone app setting page and enable the plugin, then you can see code editor in the app record page.

![](images/screenshot01.png)

## Development

Setup step is same as above.

### development mode

```bash
npm run dev
```

While the command is running, edit the source code and the plugin will be automatically built and uploaded.

### Lint and Format

```bash
npm run check
```

## License

[Apache License 2.0](./LICENSE)
