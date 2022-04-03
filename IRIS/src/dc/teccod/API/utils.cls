Class dc.teccod.API.utils
{

ClassMethod setNamespace(pNameSpace) As %Status
{
    zn pNameSpace
    Return $namespace
}

ClassMethod CreatePersentAll() As %Status
{
    Set sc = $$$OK
    n $namespace
    set $namespace="%SYS",P("Globals")="%DEFAULTDB",sc=##class(Config.Namespaces).Create("%All",.P)
    Return sc
}

ClassMethod getGlobalList(namespace) As %Status
{
    #; ^$|nspace|GLOBAL(global_name)
    set res = {}
    set res.data = []
    SET name=""
    FOR I=1:1 {
        SET name=$ORDER(^$|namespace|GLOBAL(name))
        do res.data.%Push({"name" : (name)})
        QUIT:name=""
        SET GLOBAL(I)=name
    }

    return res.%ToJSON()
}

ClassMethod generateGlobal(name, rowCount, namespace) As %Status
{
    set $namespace = namespace
    kill @name
    set $ZR = name
    set @$ZR = rowCount

    For i = 1:1:rowCount {
        set $ZR = name_"("_i_")"
        set @$ZR = $lb(
            ##class(%Library.PopulateUtils).CDate(),
            ##class(%Library.PopulateUtils).Name(),
            ##class(%Library.PopulateUtils).Counter(),
            ##class(%Library.PopulateUtils).City(),
            ##class(%Library.PopulateUtils).Street()
        )
    }

    set $namespace = "IRISAPP"

    return $$$OK
}

ClassMethod getGlobalData(name, size, namespace)
{
    set $namespace = namespace
    set $ZR = name
    set res = {}
    set res.data = []

    set node = $Query(@$ZR)

    While ((node '= "") && ($I(name) - 1 '= size)) {
        do res.data.%Push({
            "key" : (node),
            "value" : (##class(%Library.Utility).FormatString(@node))
        })
        Set node = $Query(@node)
    }

    set $namespace = "IRISAPP"

    return res.%ToJSON()
}

ClassMethod getRowCount(name)
{
    set $ZR = name
    Set node = name

    While (node '= "") {
        d $I(name)
        Set node = $Query(@node)
    }

    return ($I(name) - 1)
}

}
