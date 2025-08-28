import 'package:flutter/material.dart';

// --- MAIN APP ---
void main() {
  runApp(const FitSyncApp());
}

class FitSyncApp extends StatelessWidget {
  const FitSyncApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FitSync Prototype',
      theme: ThemeData(primarySwatch: Colors.blue),
      initialRoute: '/',
      routes: {
        '/': (context) => const LoginScreen(),
        '/energy': (context) => const EnergyPickerScreen(),
        '/workout': (context) => const WorkoutScreen(),
        '/rewards': (context) => const RewardsScreen(),
      },
    );
  }
}

// --- LOGIN SCREEN ---
class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("FitSync Login")),
      body: Center(
        child: ElevatedButton(
          child: const Text("Login (Demo)"),
          onPressed: () {
            Navigator.pushReplacementNamed(context, '/energy');
          },
        ),
      ),
    );
  }
}

// --- ENERGY PICKER ---
class EnergyPickerScreen extends StatelessWidget {
  const EnergyPickerScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("How’s your energy today?")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              child: const Text("🔋 High Energy"),
              onPressed: () {
                Navigator.pushNamed(context, "/workout", arguments: "high");
              },
            ),
            ElevatedButton(
              child: const Text("🔋 Medium Energy"),
              onPressed: () {
                Navigator.pushNamed(context, "/workout", arguments: "medium");
              },
            ),
            ElevatedButton(
              child: const Text("🔋 Low Energy"),
              onPressed: () {
                Navigator.pushNamed(context, "/workout", arguments: "low");
              },
            ),
            const SizedBox(height: 20),
            TextButton(
              onPressed: () {
                Navigator.pushNamed(context, "/rewards");
              },
              child: const Text("Go to Rewards"),
            ),
          ],
        ),
      ),
    );
  }
}

// --- WORKOUT SCREEN ---
class WorkoutScreen extends StatelessWidget {
  const WorkoutScreen({super.key});

  List<String> _getWorkoutPlan(String energyLevel) {
    switch (energyLevel) {
      case "high":
        return ["Deadlifts", "Bench Press", "HIIT Sprints"];
      case "medium":
        return ["Squats", "Pull-Ups", "Plank"];
      case "low":
        return ["Yoga Flow", "Stretching", "Foam Rolling"];
      default:
        return ["Rest Day!"];
    }
  }

  @override
  Widget build(BuildContext context) {
    final String energyLevel =
        ModalRoute.of(context)!.settings.arguments as String;
    final workoutPlan = _getWorkoutPlan(energyLevel);

    return Scaffold(
      appBar: AppBar(title: const Text("Today's Workout")),
      body: ListView.builder(
        itemCount: workoutPlan.length,
        itemBuilder: (context, index) {
          return Card(
            margin: const EdgeInsets.all(10),
            child: ListTile(title: Text(workoutPlan[index])),
          );
        },
      ),
    );
  }
}

// --- REWARDS SCREEN ---
class RewardsScreen extends StatefulWidget {
  const RewardsScreen({super.key});

  @override
  State<RewardsScreen> createState() => _RewardsScreenState();
}

class _RewardsScreenState extends State<RewardsScreen> {
  int points = 0;

  void _addPoints() {
    setState(() {
      points += 10;
    });
  }

  void _redeemPoints() {
    if (points >= 20) {
      setState(() {
        points -= 20;
      });
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("🎉 Reward Redeemed!")));
    } else {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("Not enough points!")));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Rewards & Wallet")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text("Your Points: $points", style: const TextStyle(fontSize: 24)),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _addPoints,
              child: const Text("✅ Complete Workout (Add 10 Points)"),
            ),
            ElevatedButton(
              onPressed: _redeemPoints,
              child: const Text("🎁 Redeem Reward (Cost: 20 Points)"),
            ),
          ],
        ),
      ),
    );
  }
}
