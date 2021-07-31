local HTTP = game:GetService('HttpService')
local Webhook = 'https://discord.com/api/webhooks/870783208403390474/rCL0JESCi9M3DzSRJehJM85xn6zz_lco5GcDzawOsdWKhXTJRwVRd-pctZrxRH6j5RFd'
local ServerID = string.split(string.sub(Webhook, 8), '/')[5]
local TextService = game:GetService('TextService')


game.Players.PlayerAdded:Connect(function(Player)
	local Embed = {
		['embeds'] = {{
			['title'] = '``' .. Player.Name .. '`` joined the game!',
			['color'] = 5814783,
		}}
	}
	
	HTTP:PostAsync(Webhook, HTTP:JSONEncode(Embed))
	Player.Chatted:Connect(function(Message)
		local MessageEmb = {
			['content'] = '[' .. Player.Name .. ']: ' .. TextService:FilterStringAsync(Message, Player.userId):GetNonChatStringForBroadcastAsync() .. ' ``ID: ' .. game.JobId .. '``'
		}
		
		HTTP:PostAsync(Webhook, HTTP:JSONEncode(MessageEmb))
	end)
end)

game.Players.PlayerRemoving:Connect(function(Player)
	local Embed = {
		['embeds'] = {{
			['title'] = '``' .. Player.Name .. '`` left the game!',
			['color'] = 16734296,
		}}
	}

	HTTP:PostAsync(Webhook, HTTP:JSONEncode(Embed))
end)