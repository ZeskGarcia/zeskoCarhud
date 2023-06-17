local editorStatus = "closeEditor"
local sleep = true
RegisterCommand('carhud', function(source, args)
    if not (IsPedInAnyVehicle(PlayerPedId(), false)) then
        ShowNotification(Config.Texts['notInCar'])
    else
        if (editorStatus ~= "closeEditor") then
            editorStatus = "closeEditor"
            if (Config.DEBUG) then
                print(editorStatus)
            end
        else
            editorStatus = "openEditor"
            if (Config.DEBUG) then
                print(editorStatus)
            end
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
                if (Config.DEBUG) then
                    print("Editor UI Opened")
                end
            else
                SetNuiFocus(false, false)
                if (Config.DEBUG) then
                    print("Editor UI Closed")
                end
            end
            local vehicleHealth = GetVehicleEngineHealth(vehicle)
            local vehicleFuel = GetVehicleFuelLevel(vehicle)
            local currentGear = GetVehicleCurrentGear(vehicle)

            local nuiArray = {
                showCar = true,
                action = editorStatus,
                speed = speed,
                fuel  = vehicleFuel,
                vehicleHealth = vehicleHealth,
                speedUnit = speedUnit,
                currentGear = currentGear
            }
            SendNUIMessage(nuiArray)
            sleep = true;
        else
            local nuiArray = {
                showCar = false
            }
            SendNUIMessage(nuiArray)
            sleep = true;
        end
        if sleep then Citizen.Wait(50) end
    end
end)
RegisterNUICallback('exitEditor', function(data)
    if (editorStatus ~= "closeEditor") then
        editorStatus = "closeEditor"
        if (Config.DEBUG) then
            print(editorStatus)
        end
    else
        editorStatus = "openEditor"
        if (Config.DEBUG) then
            print(editorStatus)
        end
    end
end)

function ShowNotification(text)
    -- Custom Notify Check
    if (Config.CustomNotify) then
        CustomNotification()
    else
        SetNotificationTextEntry("STRING")
        AddTextComponentString(text)
        DrawNotification(false, false)
    end
end
