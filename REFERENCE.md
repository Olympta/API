# API Reference

## App installs

#### Install an app.

```http
  GET /install/${name}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Name of the app to install. |

#### Install a specific version of an app.

```http
  GET /install/${name}/${version}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the app to install. |
| `version`      | `string` | **Required**. Version of the app to install. |

## App plists

#### Get the plist of an app.

```http
  GET /plist/${name}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Name of the app to fetch. |

#### Get the plist of a specific version of an app.

```http
  GET /plist/${name}/${version}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the app to fetch. |
| `version`      | `string` | **Required**. Version of the app to fetch. |

## App information

#### Fetch information of an app.

```http
  GET /appinfo/${name}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Name of the app to fetch. |

#### Fetch information of all apps.

```http
  GET /appinfo/all
```

## Certificate

#### Get the certificate status.

```http
  GET /status
```

#### Get some information about the current certificate.

```http
  GET /info
```