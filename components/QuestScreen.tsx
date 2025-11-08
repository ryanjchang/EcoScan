import {useState} from "react";
import { Quest } from "../types";
import { View, Text } from "react-native";
interface QuestScreenProps {
  quests: Quest[];
}
//In parent, 
// <QuestScreen quests={[waterQuest, bikeQuest]} />
//move quests to index.tsx

//assign new quests every day
//make one daily and one weekly appear

//complete quest -> show a completed screen


export default function QuestScreen({ quests }: QuestScreenProps) {
  
    return (
    <View>
      {quests[0].completed ? (
        <View>
          <Text> {quests[0].name} Quest Completed!</Text>
          <Text> {quests[0].points} points earned</Text>
          <Text> {quests[0].co2} carbon saved</Text>
        </View>
      ) : (
        <View>
          <Text> {quests[0].name}:</Text>
          <Text> {quests[0].points} points</Text>
          <Text> {quests[0].co2} carbon</Text>
          <Text> {quests[0].progress} of {quests[0].goal}</Text>
        </View>
      )}
      {quests[1].completed ? (
        <View>
          <Text> {quests[1].name} Quest Completed!</Text>
          <Text> {quests[1].points} points earned</Text>
          <Text> {quests[1].co2} carbon saved</Text>
        </View>
      ) : (
        <View>
          <Text> {quests[1].name}:</Text>
          <Text> {quests[1].points} points</Text>
          <Text> {quests[1].co2} carbon</Text>
          <Text> {quests[1].progress} of {quests[1].goal}</Text>
        </View>
      )}
    </View>
  );
}
