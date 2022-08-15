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

## Certificate

#### Get the certificate status.

```http
  GET /status
```

#### Get some information about the current certificate.

```http
  GET /info
```