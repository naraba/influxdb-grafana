# InfluxDB-Grafana

## 設定

### InfluxDB

influxdb/influxdb.env

* INFLUXDB_DB: 初期構築時に作るデータベース
* INFLUXDB_ADMIN_USER: 管理者
* INFLUXDB_ADMIN_PASSWORD: INFLUXDB_ADMIN_USEのパスワード
* INFLUXDB_READ_USER: INFLUXDB_DBに対する参照権限のみを持つユーザ
* INFLUXDB_READ_USER_PASSWORD: INFLUXDB_READ_USERのパスワード

### Grafana

grafana/grafana.env

* GF_SECURITY_ADMIN_USER: 管理者
* GF_SECURITY_ADMIN_PASSWORD: GF_SECURITY_ADMIN_USERのパスワード
* GF_USERS_ALLOW_SIGN_UP: ユーザ自身によるサインアップ可否
* GF_USERS_ALLOW_ORG_CREATE: ユーザによるorganization作成可否

## 起動後の手順

### InfluxDBの環境構築

#### データベース作成

環境変数INFLUXDB_DBで指定したデータベース以外を作成する場合は以下に沿って実施

```
$ docker exec -it (container name) bash
# export INFLUX_USERNAME=admin
# export INFLUX_PASSWORD=(password)
# influx

> show databases
> create database (database name)
> show databases
```

#### テストデータの投入

```
> use (database name)
> insert (measurement name),(tag name)=(value) (field name)=(value)
> select * from (measurement name)
```

### Grafanaの初期設定

#### ログインとデータソースの設定

* http://localhost:3000 にアクセスして管理者でログイン
* Configuration -> Data Sources -> Add data source -> InfluxDB にて以下を設定
    * HTTP - URL: http://influxdb:8086
    * InfluxDB Details - Database: (database name)
    * InfluxDB Details - User: (read user name)
    * InfluxDB Details - Password: (read user password)

### 永続データの削除

#### InfluxDBのデータ削除
```
sudo rm -rf ./volumes
```

#### Grafanaのデータ削除

```
$ docker volumes rm (volume name)
```


## TODO

* Grafanaでのアラート設定（メール通知）
* blah-blah-blah
