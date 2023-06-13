"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

type Tier = keyof typeof TIERS;

/**
 * Map of tier name to tailwindcss color.
 */
export const TIERS = {
    "Absolutely amazing": "bg-green-500",
    Great: "bg-green-400",
    Decent: "bg-yellow-400",
    Bad: "bg-red-400",
    Trash: "bg-red-500",
    Unranked: "bg-gray-400",
} as const;

/**
 * Map of item name to image.
 */
export const IMAGES: Record<string, string> = {
    AdvancedNMotd: "/advancednmotd.png",
    AngelChest: "/angelchest.png",
    "AriKeys (MythicKeys)": "/arikeys.png",
    ArmorStandTools: "/armorstandtools.png",
    AuctionHouse: "/auctionhouse.png",
    AutoCrafting: "/automatedcrafting.png",
    BetonQuest: "/betonquest.png",
    BuyCraftX: "/buycraftx.png",
    Chunky: "/chunky.png",
    ClearLagg: "/clearlagg.png",
    CMI: "/cmi.png",
    ColoredAnvils: "/coloredanvils.png",
    CommandHook: "/commandhook.png",
    CoreProtect: "/coreprotect.png",
    CustomCrafting: "/customcrafting.png",
    dDiscordBot: "/ddiscordbot.png",
    DeathMessagesPrime: "/deathmessagesprime.png",
    Denizen: "/denizen.png",
    Depenizen: "/depenizen.png",
    EndCreditsCommand: "/endcreditscommand.png",
    DiscordSRV: "/discordsrv.png",
    Dynmap: "/dynmap.png",
    Elevator: "/elevator.png",
    EssentialsX: "/essentialsx.png",
    F3Name: "/f3name.png",
    FAWE: "/fawe.png",
    Featherboard: "/featherboard.png",
    GriefDefender: "/griefdefender.png",
    HeadDatabase: "/headdatabase.png",
    HiveChecker: "/hivechecker.png",
    HolographicDisplays: "/holographicdisplays.png",
    ImageOnMap: "/imageonmap.png",
    Insights: "/insights.png",
    InteractionVisualizer: "/interactionvisualizer.png",
    InteractiveBoard: "/interactiveboard.png",
    InteractiveBooks: "/interactivebooks.png",
    InteractiveChat: "/interactivechat.png",
    ICDA: "/icda.png",
    "Invsee++": "/invsee++.png",
    ItemNbtAPI: "/itemnbtapi.png",
    LibsDisguises: "/libsdisguises.png",
    LightAPI: "/lightapi.png",
    LuckPerms: "/luckperms.png",
    McMMO: "/mcmmo.png",
    "MC Pets": "/mcpets.png",
    ModelEngine: "/modelengine.png",
    Multiverse: "/multiverse.png",
    MythicCrucible: "/mythiccrucible.png",
    MythicMobs: "/mythicmobs.png",
    NexelWilderness: "/nexelwilderness.png",
    NuVotifier: "/nuvotifier.png",
    OpenAudioMC: "/openaudiomc.png",
    PerWorldInv: "/perworldinv.png",
    PAPI: "/papi.png",
    PlayerWarps: "/playerwarps.png",
    ProtocolLib: "/protocollib.png",
    PVPManager: "/pvpmanager.png",
    Quickshop: "/quickshop.png",
    RealEstate: "/realestate.png",
    SerialKey: "/serialkey.png",
    ServerUtils: "/serverutils.png",
    ShulkerPacks: "/shulkerpacks.png",
    SilkSpawners: "/silkspawners.png",
    Spark: "/spark.png",
    TAB: "/tab.png",
    TabTPS: "/tabtps.png",
    Trademe: "/trademe.png",
    Universes: "/universes.png",
    Vault: "/vault.png",
    Viaversion: "/viaversion.png",
    Vivecraft: "/vivecraft.png",
    VoidGen: "/voidgen.png",
    Voting: "/voting.png",
    Webstats: "/webstats.png",
    WESV: "/wesv.png",
    WorldGuard: "/worldguard.png",
    WGEF: "/wgef.png",
};

/**
 * A tier list.
 */
export default function Home() {
    const [spaceBarQueueIndex, setSpaceBarQueueIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState<keyof typeof IMAGES | null>(null);
    // state for tiers for each item
    const [tierItems, setTierItems] = useState<Map<Tier, (keyof typeof IMAGES)[]>>(new Map());

    const handleClick = (item: keyof typeof IMAGES) => () => {
        console.log(`Clicked ${item}`);
        setSelectedItem(item);
    };

    // Helper function to get the tier based on the key pressed
    const getTierFromKey = (key: string): Tier | null => {
        switch (key) {
            case "1":
                return "Absolutely amazing";
            case "2":
                return "Great";
            case "3":
                return "Decent";
            case "4":
                return "Bad";
            case "5":
                return "Trash";
            case "6":
                return "Unranked";
            default:
                return null;
        }
    };

    // Attach event listener on component mount and remove it on unmount
    useEffect(() => {
        // Keyboard event handler
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(`[Event] Key press: ${event.key}. Shift? ${event.shiftKey}.`);

            if (event.key === "Escape") {
                // Clear the selected item
                console.log("Clearing selected item");
                setSelectedItem(null);
                return;
            }

            // handle spacebar
            if (event.key === "n" || event.key === "p") {
                // Clear the selected item
                console.log("Clearing selected item");
                setSelectedItem(null);
                console.log("Choosing next item");
                if (event.key === "p") {
                    // decrement
                    setSpaceBarQueueIndex((prev) => (prev - 1 + Object.keys(IMAGES).length) % Object.keys(IMAGES).length);
                } else {
                    // increment
                    setSpaceBarQueueIndex((prev) => (prev + 1 + Object.keys(IMAGES).length) % Object.keys(IMAGES).length);
                }
                // Choose the next item
                const nextItem = Object.keys(IMAGES)[spaceBarQueueIndex];
                console.log(`Selected item: ${nextItem}`);
                setSelectedItem(nextItem);

                return;
            }

            // handle hjkl like vim
            if ((event.key === "h" || event.key === "l") && selectedItem && [...tierItems.values()].flat().includes(selectedItem)) {
                setTierItems((prev) => {
                    const newMap = new Map(prev);
                    // find the tier with the selected item
                    const tier = [...prev.entries()].find(([tier, items]) => items.includes(selectedItem))![0];
                    // array of items in the tier
                    const items = prev.get(tier)!;
                    // shift the item to the left/right in the array
                    const index = items.indexOf(selectedItem);
                    if (index !== 0 && event.key === "h") {
                        items.splice(index, 1); // remove the item
                        items.splice(index - 1, 0, selectedItem); // insert the item to the left
                    }
                    if (index !== items.length - 1 && event.key === "l") {
                        items.splice(index, 1); // remove the item
                        items.splice(index + 1, 0, selectedItem); // insert the item to the right
                    }
                    // update the map
                    newMap.set(tier, items);
                    return newMap;
                });
            }
            if ((event.key === "j" || event.key === "k") && selectedItem && [...tierItems.values()].flat().includes(selectedItem)) {
                setTierItems((prev) => {
                    const newMap = new Map(prev);
                    // find the tier with the selected item
                    const tier = [...prev.entries()].find(([tier, items]) => items.includes(selectedItem))![0];
                    const prevTier = Object.keys(TIERS)[Object.keys(TIERS).indexOf(tier) - 1] as Tier | undefined;
                    console.log({ prevTier });
                    if (!prevTier && event.key === "k") {
                        return prev;
                    }
                    const nextTier = Object.keys(TIERS)[Object.keys(TIERS).indexOf(tier) + 1] as Tier | undefined;
                    console.log({ nextTier });
                    if (!nextTier && event.key === "j") {
                        return prev;
                    }
                    // array of items in the tier
                    const items = prev.get(tier)!;
                    const prevItems = prev.get(prevTier!) ?? [];
                    const nextItems = prev.get(nextTier!) ?? [];
                    // shift the item to the left/right in the array
                    const index = items.indexOf(selectedItem);
                    console.log({ index });
                    if (index !== -1) {
                        if (event.key === "k") {
                            items.splice(index, 1); // remove the item
                            prevItems.push(selectedItem); // insert the item to the row above
                        } else {
                            items.splice(index, 1); // remove the item
                            nextItems.push(selectedItem); // insert the item to the row below
                        }
                    }
                    // update the map
                    newMap.set(tier, items);
                    newMap.set(prevTier!, prevItems);
                    newMap.set(nextTier!, nextItems);
                    console.log(newMap);
                    return newMap;
                });
            }

            if (selectedItem) {
                const tier = getTierFromKey(event.key);
                if (tier) {
                    // Place the selected item into the specified tier
                    console.log(`Placing ${selectedItem} into ${tier}`);
                    setTierItems((prev) => {
                        const newMap = new Map(prev);
                        // Remove the item from the previous tier
                        for (const [tier, items] of newMap.entries()) {
                            const index = items.indexOf(selectedItem);
                            if (index !== -1) {
                                items.splice(index, 1);
                                newMap.set(tier, items);
                            }
                        }
                        // Add the item to the new tier
                        const items = newMap.get(tier) ?? [];
                        items.push(selectedItem);
                        newMap.set(tier, items);
                        return newMap;
                    });
                }
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedItem, spaceBarQueueIndex, tierItems]);

    console.log(tierItems);

    const renderedItems = (name: string) =>
        [...tierItems.entries()].map(([tier, items]) => {
            if (tier === name) {
                console.log(`Found ${tier} items: ${items}`);
                return items.map((item, index) => {
                    console.log(`Rendering ${item}`);
                    return (
                        <div
                            key={index}
                            className={`relative w-32 h-32 flex flex-col items-center justify-center
                                ${selectedItem === item ? "bg-gray-600" : ""}
                            `}
                            onClick={handleClick(item)}
                        >
                            {/* Image */}
                            <Image src={IMAGES[item]} alt={item} className="cursor-pointer" height={48} width={48} />
                            {/* Item name */}
                            <p className="absolute bottom-0 w-full text-center font-mono text-xs">{item}</p>
                        </div>
                    );
                });
            }
            return []; // Return an empty array for non-matching tiers
        });

    return (
        <div className="flex flex-col justify-center min-h-screen">
            {/* Selected item indicator */}
            <div className="flex flex-col min-h-1/5">
                <p className="font-mono">Selected item:</p>
                {selectedItem ? (
                    <div className="relative w-32 h-32 flex flex-col items-center justify-center">
                        {/* Image */}
                        <Image src={IMAGES[selectedItem]} alt={selectedItem} className="cursor-pointer" height={48} width={48} />
                        {/* Item name */}
                        <p className="absolute bottom-0 w-full text-center font-mono">{selectedItem}</p>
                    </div>
                ) : (
                    <p className="font-mono">None</p>
                )}
            </div>
            {/* Tier list */}
            <div className="flex flex-col justify-center h-4/5">
                {Object.entries(TIERS).map(([name, color]) => (
                    <div key={name} className="flex flex-row items-center">
                        {/* Square with tier text inside */}
                        <div className={`w-32 h-32 ${color} text-white flex items-center justify-center`}>
                            <p className="text-center font-mono">{name}</p>
                        </div>
                        {/* List of items in this tier */}
                        <div className={`
                            flex flex-row flex-wrap
                            ${color} bg-opacity-30
                            max-w-[calc(100vw-128px)]
                        `}>{renderedItems(name)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
