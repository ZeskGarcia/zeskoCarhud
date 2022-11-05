local editorStatus = "closeEditor"
local sleep = true
RegisterCommand('carhud', function(source, args)
    if not (IsPedInAnyVehicle(PlayerPedId(), false)) then
        ShowNotification(Config.Texts['notInCar'])
    else
        if (editorStatus ~= "closeEditor") then
            editorStatus = "closeEditor"
            print(editorStatus)
        else
            editorStatus = "openEditor"
            print(editorStatus)
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        local ped = PlayerPedId()
        if (IsPedInAnyVehicle(PlayerPedId(), false)) then
            local vehicle = GetVehiclePedIsIn(ped, false)
            local speed = 0
            local speedUnit = "kmh"
            if (Config.UseKMH) then
                speed = GetEntitySpeed(vehicle) * 3.6
                speedUnit = "kmh"
            else
                speed = GetEntitySpeed(vehicle) * 2.8
                speedUnit = "mph"
            end
            if (editorStatus ~= "closeEditor") then
                SetNuiFocus(true, true)
            else
                SetNuiFocus(false, false)
            end
            local vehicleHealth = GetVehicleEngineHealth(vehicle)
            local vehicleFuel = GetVehicleFuelLevel(vehicle)
            local currentGear = GetVehicleCurrentGear(vehicle)
            SendNUIMessage({
                showCar = true,
                action = editorStatus,
                speed = speed,
                fuel  = vehicleFuel,
                vehicleHealth = vehicleHealth,
                speedUnit = speedUnit,
                currentGear = currentGear
            })
            sleep = true;
        else
            SendNUIMessage({
                showCar = false
            })
            sleep = true;
        end
        if sleep then Citizen.Wait(50) end
    end
end)
RegisterNUICallback('exitEditor', function(data)
    if (editorStatus ~= "closeEditor") then
        editorStatus = "closeEditor"
        print(editorStatus)
    else
        editorStatus = "openEditor"
        print(editorStatus)
    end
end)

function ShowNotification(text)
    SetNotificationTextEntry("STRING")
    AddTextComponentString(text)
    DrawNotification(false, false)
end
