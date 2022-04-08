Class dc.teccod.API.DocDB
{

ClassMethod createItem(namespace, database, collection, id, value)
{
    set db = ..getDb(namespace, database)
    set gref = (db_"("""_collection_""","""_id_""")")
    set @gref = value
    return gref
}

ClassMethod removeDatabase(database) As %Status
{
    set $ZR = "^DocDB."_database
    KILL @$ZR
}

ClassMethod getStructure(namespace) As %Status
{
    set res = {}
    set res.databases = []
    SET name=""
    FOR I=1:1 {
        SET name=$ORDER(^$|namespace|GLOBAL(name))
        if ($piece(name, ".", 1) = "^DocDB"){
            do res.databases.%Push({
                "name" : ($extract(name, 8, *)),
                "collections" : (..getGlobalData($extract(name, 8, *), namespace))
            })
        }
        QUIT:name=""
        SET GLOBAL(I)=name
    }

    return res.%ToJSON()
}

ClassMethod getGlobalData(database, namespace)
{
    set db = ..getDb(namespace, database)
    Set key = $Order(@(db_"("""")"))
    set res = []

    While (key '= "") {
        d res.%Push(key)
        Set key = $Order(@(db_"("""_key_""")"))
    }

    return res
}

ClassMethod getDocuments(database, collection, namespace)
{
    set node = $Query(@..getDb(namespace, database))
    set res = {}
    set res.data = []

    while node '= ""{
        if ($QSUBSCRIPT(node, 1) = collection) && (@node '= ""){
            do res.data.%Push({"id" : ($QSUBSCRIPT(node, 2)), "value" : (@node)})
        }
        set node = $Query(@node)
    }

    return res.%ToJSON()
}

ClassMethod dropDatabase(database, namespace)
{
    set db = ..getDb(namespace, database)
    kill @(db)
    return $$$OK
}

ClassMethod dropCollection(database, collection, namespace)
{
    set db = ..getDb(namespace, database)
    kill @(db_"("""_collection_""")")
    return $$$OK
}

ClassMethod dropDocument(database, collection, id, namespace)
{
    set db = ..getDb(namespace, database)
    kill @(db_"("""_collection_""", """_id_""")")
    return $$$OK
}

ClassMethod getDb(namespace, database)
{
    return "^["""_namespace_"""]DocDB."_database
}

}
