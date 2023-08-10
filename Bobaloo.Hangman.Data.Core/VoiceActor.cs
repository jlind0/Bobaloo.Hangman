using Bobaloo.Hangman.Data.Core;
using System;
using System.Collections.Generic;

namespace Bobaloo.Hangman.Data;

public partial class VoiceActor : Entity<int>
{
    public override int PrimaryKey { get => VoiceActorId; set => VoiceActorId = value; }
    public int VoiceActorId { get; set; }

    public string Name { get; set; } = null!;

    public string FakeYouModelName { get; set; } = null!;
}
